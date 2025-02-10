import { NextResponse, NextRequest } from "next/server";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const { fileData, fileType, format } = await request.json();

    if (!fileData) {
      return NextResponse.json(
        { error: "No file data provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(fileData, "base64");
    let convertedData: Buffer;

    if (fileType.startsWith("image/")) {
      convertedData = await convertImage(buffer, format);
    } else if (fileType === "application/pdf") {
      convertedData = await convertPDF(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      convertedData: convertedData.toString("base64"),
    });
  } catch (error) {
    console.error("Error during file conversion:", error);
    return NextResponse.json(
      { error: "File conversion failed" },
      { status: 500 }
    );
  }
}

const convertImage = async (inputBuffer: Buffer, format: string) => {
  return await sharp(inputBuffer)
    .toFormat(format as keyof sharp.FormatEnum | sharp.AvailableFormatInfo)
    .toBuffer();
};

const convertPDF = async (inputBuffer: Buffer) => {
  const pdfDoc = await PDFDocument.load(inputBuffer);
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
