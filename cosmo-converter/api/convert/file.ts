import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Adjust the size limit as needed
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { fileData, fileType, format } = req.body;

      if (!fileData) {
        return res.status(400).json({ error: "No file data provided" });
      }

      const buffer = Buffer.from(fileData, "base64");

      let convertedData: Buffer;

      if (fileType.startsWith("image/")) {
        convertedData = await convertImage(buffer, format);
      } else if (fileType === "application/pdf") {
        convertedData = await convertPDF(buffer);
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      const base64ConvertedData = convertedData.toString("base64");

      res.status(200).json({ convertedData: base64ConvertedData });
    } catch (error) {
      console.error("Error during file conversion:", error);
      res.status(500).json({ error: "File conversion failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

const convertImage = async (inputBuffer: Buffer, format: string) => {
  const outputBuffer = await sharp(inputBuffer)
    .toFormat(format as keyof sharp.FormatEnum | sharp.AvailableFormatInfo)
    .toBuffer();
  return outputBuffer;
};

const convertPDF = async (inputBuffer: Buffer) => {
  const pdfDoc = await PDFDocument.load(inputBuffer);
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};
