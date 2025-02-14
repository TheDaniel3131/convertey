import { NextResponse, NextRequest } from "next/server";
import sharp from "sharp";
import mammoth from "mammoth";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";
import PDFParser from "pdf2json";
import ffmpeg from "fluent-ffmpeg";
import { writeFile, unlink, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import * as XLSX from "xlsx";
import removeMarkdown from "remove-markdown";
import { promisify } from 'util';
import libre from 'libreoffice-convert';
const libreConvert = promisify(libre.convert);

// Configuration
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const TMP_DIR = join(process.cwd(), "tmp");

async function convertVideo(
  inputPath: string,
  outputPath: string,
  format: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat(format)
      .on("end", () => resolve())
      .on("error", reject)
      .save(outputPath);
  });
}

async function convertAudio(
  inputPath: string,
  outputPath: string,
  format: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat(format)
      .on("end", () => resolve())
      .on("error", reject)
      .save(outputPath);
  });
}

async function convertPresentation(
  inputBuffer: Buffer,
  sourceFormat: string,
  targetFormat: string
): Promise<Buffer> {
  const formatExtMap: Record<string, string> = {
    'ppt': 'ppt',
    'pptx': 'pptx',
    'pdf': 'pdf'
  };

  if (!formatExtMap[targetFormat]) {
    throw new Error(`Unsupported target format: ${targetFormat}`);
  }

  try {
    // LibreOffice should be installed and accessible in the system PATH
    const convertedBuffer = await libreConvert(inputBuffer, formatExtMap[targetFormat], undefined);
    return Buffer.from(convertedBuffer);
  } catch (error) {
    console.error('Presentation conversion error:', error);
    throw new Error(`Failed to convert presentation: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { fileData, fileType, format, fileName } = await request.json();

    if (!fileData || !fileType || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(fileData, "base64");

    if (fileBuffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds limit (100MB)" },
        { status: 400 }
      );
    }

    await mkdir(TMP_DIR, { recursive: true });

    const inputId = randomUUID();
    const outputId = randomUUID();
    const inputExt = fileName.split(".").pop();
    const inputPath = join(TMP_DIR, `${inputId}.${inputExt}`);
    const outputPath = join(TMP_DIR, `${outputId}.${format}`);

    await writeFile(inputPath, fileBuffer);

    // Handle different file types
    if (fileType.startsWith("video/")) {
      await convertVideo(inputPath, outputPath, format);
    } else if (fileType.startsWith("audio/")) {
      await convertAudio(inputPath, outputPath, format);
    } else if (fileType.includes("image/")) {
      const result = await sharp(fileBuffer)
        .toFormat(format as keyof sharp.FormatEnum)
        .toBuffer();
      return NextResponse.json({
        convertedData: result.toString("base64"),
        fileName: `converted.${format}`,
      });
    } else if (
      fileType === "application/vnd.ms-powerpoint" || // PPT
      fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" // PPTX
    ) {
      try {
        const sourceFormat = fileType === "application/vnd.ms-powerpoint" ? "ppt" : "pptx";
        
        if (!["ppt", "pptx", "pdf"].includes(format)) {
          return NextResponse.json(
            { error: "Unsupported presentation conversion format. Supported formats: ppt, pptx, pdf" },
            { status: 400 }
          );
        }

        const convertedBuffer = await convertPresentation(fileBuffer, sourceFormat, format);

        return NextResponse.json({
          convertedData: convertedBuffer.toString("base64"),
          fileName: `converted.${format}`,
        });
      } catch (error) {
        console.error("Presentation conversion error:", error);
        return NextResponse.json(
          {
            error: "Presentation conversion failed",
            details: error instanceof Error ? error.message : String(error),
          },
          { status: 500 }
        );
      }
    } else if (fileType.includes("word")) {
      if (format !== "pdf")
        return NextResponse.json(
          { error: "Only PDF conversion supported for Word" },
          { status: 400 }
        );
      const { value: text } = await mammoth.extractRawText({
        buffer: fileBuffer,
      });
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      page.drawText(text, {
        x: 50,
        y: height - 100,
        maxWidth: width - 100,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      const pdfBytes = await pdfDoc.save();
      return NextResponse.json({
        convertedData: Buffer.from(pdfBytes).toString("base64"),
        fileName: `converted.pdf`,
      });
    } else if (fileType === "application/pdf" && format === "docx") {
      const pdfParser = new PDFParser();
      const doc = await new Promise<Document>((resolve) => {
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          const text = pdfData.Pages.map((page) =>
            page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join(" ")
          ).join("\n");
          resolve(
            new Document({
              sections: [
                {
                  children: [new Paragraph({ children: [new TextRun(text)] })],
                },
              ],
            })
          );
        });
        pdfParser.parseBuffer(fileBuffer);
      });
      const docxBuffer = await Packer.toBuffer(doc);
      return NextResponse.json({
        convertedData: Buffer.from(docxBuffer).toString("base64"),
        fileName: `converted.docx`,
      });
    } else if (
      fileType === "application/vnd.ms-excel" || // .xls
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
      fileType === "text/csv" // .csv
    ) {
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });

      let outputBuffer: Buffer;
      if (format === "csv") {
        const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
        outputBuffer = Buffer.from(csv);
      } else if (format === "xlsx") {
        outputBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      } else if (format === "xls") {
        outputBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xls" });
      } else {
        return NextResponse.json(
          { error: "Unsupported spreadsheet conversion format" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        convertedData: outputBuffer.toString("base64"),
        fileName: `converted.${format}`,
      });
    } else if (fileType === "text/plain" || fileType === "text/markdown") {
      const textContent = fileBuffer.toString("utf-8");

      if (format === "txt") {
        let plainText = textContent;
        if (fileType === "text/markdown") {
          plainText = removeMarkdown(textContent);
        }
        return NextResponse.json({
          convertedData: Buffer.from(plainText).toString("base64"),
          fileName: `converted.txt`,
        });
      } else if (format === "md") {
        let markdownContent = textContent;
        if (fileType === "text/plain") {
          markdownContent = `# Converted Text\n\n${textContent}`;
        }
        return NextResponse.json({
          convertedData: Buffer.from(markdownContent).toString("base64"),
          fileName: `converted.md`,
        });
      } else if (format === "pdf") {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.drawText(textContent, {
          x: 50,
          y: height - 100,
          maxWidth: width - 100,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        const pdfBytes = await pdfDoc.save();
        return NextResponse.json({
          convertedData: Buffer.from(pdfBytes).toString("base64"),
          fileName: `converted.pdf`,
        });
      } else {
        return NextResponse.json(
          { error: "Unsupported text conversion format" },
          { status: 400 }
        );
      }
    }

    const convertedBuffer = await readFile(outputPath);
    await Promise.all([unlink(inputPath), unlink(outputPath)]);
    return NextResponse.json({
      convertedData: convertedBuffer.toString("base64"),
      fileName: `converted.${format}`,
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      {
        error: "Conversion failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;