// types/pdf-officegen.d.ts
declare module 'pdf-officegen' {
    export function pdf2docx(inputPath: string, outputPath: string): Promise<void>;
}