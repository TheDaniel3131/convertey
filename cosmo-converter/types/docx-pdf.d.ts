declare module "docx-pdf" {
  import { Buffer } from "buffer";

  export function convertToPdf(buffer: Buffer): Promise<Buffer>;
}
