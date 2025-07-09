// global.d.ts
export {};

declare global {
  interface DropboxFile {
    link: string;
    name: string;
  }

  interface DropboxChooseOptions {
    linkType: "preview" | "direct";
    multiselect: boolean;
    success: (files: DropboxFile[]) => void;
    cancel?: () => void;
  }

  interface Window {
    Dropbox: {
      choose: (options: DropboxChooseOptions) => void;
    };
  }
}
