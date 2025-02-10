import { NextResponse, NextRequest } from "next/server";
import sharp from "sharp";

async function convertImage(
  fileBuffer: Buffer,
  format: string,
  options: { quality?: number } = { quality: 90 }
): Promise<Buffer> {
  const sharpInstance = sharp(fileBuffer);

  switch (format) {
    case "png":
      return sharpInstance.png().toBuffer();
    case "jpg":
    case "jpeg":
      return sharpInstance.jpeg({ quality: options.quality }).toBuffer();
    case "webp":
      return sharpInstance.webp({ quality: options.quality }).toBuffer();
    default:
      throw new Error("Unsupported image format");
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { fileData, fileType, format } = await request.json();

    if (!fileData || !fileType || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(fileData, "base64");
    let convertedBuffer: Buffer;

    if (fileType.startsWith("image/")) {
      try {
        convertedBuffer = await convertImage(fileBuffer, format);
      } catch (error) {
        console.error("Image conversion error:", error);
        return NextResponse.json(
          { error: "Image conversion failed" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Currently only image conversions are supported" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      convertedData: convertedBuffer.toString("base64"),
      fileName: `converted.${format}`,
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
