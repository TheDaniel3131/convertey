// app/api/convert/file/route.ts
import { NextResponse } from "next/server";
import sharp from "sharp";

// Helper to convert image using Sharp
async function convertImage(
  fileBuffer: Buffer,
  format: string,
  options = { quality: 90 }
) {
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

export async function POST(req: Request) {
  try {
    const { fileData, fileType, format } = await req.json();

    if (!fileData || !fileType || !format) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(fileData, "base64");
    let convertedBuffer: Buffer;

    // Handle image conversions
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
      // For now, return an error for non-image conversions
      return NextResponse.json(
        { error: "Currently only image conversions are supported" },
        { status: 400 }
      );
    }

    // Convert back to base64 for response
    const convertedData = convertedBuffer.toString("base64");

    return NextResponse.json({
      convertedData,
      fileName: `converted.${format}`,
    });
  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
