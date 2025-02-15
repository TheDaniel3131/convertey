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
import AdmZip from 'adm-zip';
import { parseString } from 'xml2js';
const libreConvert = promisify(libre.convert);
const parseXml = promisify(parseString);

// Configuration
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const TMP_DIR = join(process.cwd(), "tmp");

interface EpubContent {
  title: string;
  chapters: Array<{
    id: string;
    title?: string;
    content: string;
  }>;
}

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

// Helper function to parse EPUB content
async function parseEpub(epubBuffer: Buffer): Promise<EpubContent> {
  const zip = new AdmZip(epubBuffer);
  const containerEntry = zip.getEntry('META-INF/container.xml');
  
  if (!containerEntry) {
    throw new Error('Invalid EPUB: Missing container.xml');
  }

  // Define interface for container XML structure
  interface ContainerXml {
    container: {
      rootfiles: [{
        rootfile: [{
          $: {
            'full-path': string
          }
        }]
      }]
    }
  }

  // Parse container.xml to get the path to content.opf
  const containerXml = containerEntry.getData().toString('utf8');
  const container = await parseXml(containerXml) as ContainerXml;
  const contentPath = container.container.rootfiles[0].rootfile[0].$['full-path'];

  // Parse content.opf
  const contentEntry = zip.getEntry(contentPath);
  if (!contentEntry) {
    throw new Error('Invalid EPUB: Missing content.opf');
  }

  const contentXml = contentEntry.getData().toString('utf8');

  interface PackageXml {
    package: {
      spine: [{
        itemref: Array<{
          $: { 'idref': string }
        }>
      }];
      manifest: [{
        item: Array<{
          $: { id: string; href: string }
        }>
      }];
      metadata: [{
        'dc:title': string[]
      }];
    }
  }

  const content = await parseXml(contentXml) as PackageXml;

  // Get spine order
  const spine = content.package.spine[0].itemref.map((item) => item.$['idref']);
  
  // Define interface for manifest item structure
  interface ManifestMap {
    [key: string]: string;
  }

  // Get manifest items
  const manifest = content.package.manifest[0].item.reduce((acc: ManifestMap, item: { $: { id: string; href: string } }) => {
    acc[item.$['id']] = item.$['href'];
    return acc;
  }, {} as ManifestMap);

  // Extract title
  const title = content.package.metadata[0]['dc:title'][0] || 'Untitled';

  // Process chapters in spine order
  const chapters = [];
  const contentDir = contentPath.split('/').slice(0, -1).join('/');

  for (const itemId of spine) {
    const href = manifest[itemId];
    if (!href) continue;

    const chapterPath = contentDir ? `${contentDir}/${href}` : href;
    const chapterEntry = zip.getEntry(chapterPath);
    
    if (chapterEntry) {
      const chapterContent = chapterEntry.getData().toString('utf8');
      chapters.push({
        id: itemId,
        content: chapterContent
      });
    }
  }

  return { title, chapters };
}

// Helper function to convert HTML content to plain text
function htmlToText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-zA-Z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper function to convert EPUB to plain text
async function epubToText(epubBuffer: Buffer): Promise<string> {
  const { title, chapters } = await parseEpub(epubBuffer);
  
  let textContent = `${title}\n\n`;
  
  for (const chapter of chapters) {
    const chapterText = htmlToText(chapter.content);
    textContent += chapterText + '\n\n';
  }
  
  return textContent;
}

// Helper function to convert EPUB to PDF
// Helper function to normalize special characters
function normalizeSpecialChars(text: string): string {
  return text
    // Replace various types of hyphens/dashes with standard hyphen
    .replace(/[\u2010-\u2015]/g, '-')
    // Replace curly quotes with straight quotes
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    // Replace other special spaces and punctuation
    .replace(/[\u2000-\u200F\u2028-\u202F\u205F\u2060\u3000]/g, ' ')
    // First try to decompose characters to their base form
    .normalize('NFKD')
    // Remove combining diacritical marks
    .replace(/[\u0300-\u036f]/g, '')
    // Replace any remaining non-ASCII characters with their closest ASCII equivalents
    .replace(/[^\x00-\x7F]/g, char => {
      // Map common Unicode characters to ASCII equivalents
      const charMap: { [key: string]: string } = {
        '…': '...',
        '–': '-',
        '—': '-',
        "'''": "'",
        '"': '"',
        '′': "'",
        '″': '"',
        '‴': "'''",
        '⁗': '""""',
        '「': '"',
        '」': '"',
        '『': '"',
        '』': '"',
        '〝': '"',
        '〞': '"',
        '＂': '"',
        '｢': '"',
        '｣': '"',
      };
      return charMap[char] || ' ';
    });
}

// Helper function to convert EPUB to PDF
async function epubToPdf(epubBuffer: Buffer): Promise<Buffer> {
  const { title, chapters } = await parseEpub(epubBuffer);
  
  // Create PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Use Times Roman for better character support
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const titleFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  
  // Add title page
  const titlePage = pdfDoc.addPage();
  const { width, height } = titlePage.getSize();
  
  // Safely encode title text
  const normalizedTitle = normalizeSpecialChars(title);
  titlePage.drawText(normalizedTitle, {
    x: 50,
    y: height - 150,
    size: 24,
    font: titleFont,
    color: rgb(0, 0, 0),
  });

  // Process chapters
  for (const chapter of chapters) {
    const chapterText = htmlToText(chapter.content);
    
    // Split text into pages (rough calculation)
    const CHARS_PER_PAGE = 3000;
    const textChunks = chapterText.match(new RegExp(`.{1,${CHARS_PER_PAGE}}`, 'g')) || [];
    
    for (const chunk of textChunks) {
      const page = pdfDoc.addPage();
      const normalizedChunk = normalizeSpecialChars(chunk);
      
      page.drawText(normalizedChunk, {
        x: 50,
        y: height - 50,
        maxWidth: width - 100,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
        lineHeight: 16,
      });
    }
  }
  
  return Buffer.from(await pdfDoc.save());
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

    // Handle EPUB conversions
    if (fileType === "application/epub+zip") {
      if (!["pdf", "txt"].includes(format)) {
        return NextResponse.json(
          { error: "EPUB can only be converted to PDF or TXT formats" },
          { status: 400 }
        );
      }

      try {
        let convertedData: Buffer;
        if (format === "pdf") {
          convertedData = await epubToPdf(fileBuffer);
        } else { // format === "txt"
          const textContent = await epubToText(fileBuffer);
          convertedData = Buffer.from(textContent);
        }

        return NextResponse.json({
          convertedData: convertedData.toString("base64"),
          fileName: `converted.${format}`,
        });
      } catch (error) {
        console.error("EPUB conversion error:", error);
        return NextResponse.json(
          {
            error: "EPUB conversion failed",
            details: error instanceof Error ? error.message : String(error),
          },
          { status: 500 }
        );
      }
    }
    // Handle different file types
    else if (fileType.startsWith("video/")) {
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