declare module 'officegen' {
    interface TextOptions {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      font_size?: number;
      color?: string;
      font_face?: string;
    }
  
    interface Paragraph {
      addText(text: string, options?: TextOptions): void;
    }
  
    interface Document {
      createP(): Paragraph;
      generate(stream: NodeJS.WritableStream): void;
    }
  
    interface OfficeGen {
      (docType: string): Document;
    }
  
    const officegen: OfficeGen;
    export default officegen;
  }

