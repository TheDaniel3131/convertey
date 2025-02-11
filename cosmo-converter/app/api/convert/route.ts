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
