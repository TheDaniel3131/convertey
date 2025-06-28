import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

export const convertImage = async (inputBuffer: Buffer, format: string) => {
  const outputBuffer = await sharp(inputBuffer)
    .toFormat(format as keyof sharp.FormatEnum | sharp.AvailableFormatInfo)
    .toBuffer();
  return outputBuffer;
};

export const convertPDF = async (inputBuffer: Buffer) => {
  const pdfDoc = await PDFDocument.load(inputBuffer);
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
