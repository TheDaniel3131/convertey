import { FORMAT_GROUPS } from "@/lib/config/fileUpload";

export type FileUploadProps = {
  onConvert: (file: File) => void;
  maxSizeMB?: number;
  allowedGroups?: Array<keyof typeof FORMAT_GROUPS>;
};
