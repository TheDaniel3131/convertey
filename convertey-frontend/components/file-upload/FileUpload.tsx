import React, { useState } from "react";
import { FileUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FORMAT_GROUPS } from "@/lib/config/fileUpload";
import type { FileUploadProps } from "@/types/FileUploadProps";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

export default function FileUpload({
  onConvert,
  maxSizeMB = 25,
  allowedGroups = Object.keys(FORMAT_GROUPS).filter(
    (group) => group !== "video"
  ) as Array<keyof typeof FORMAT_GROUPS>,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  // Get allowed extensions based on allowed groups
  const getAllowedExtensions = () => {
    return allowedGroups
      .flatMap((group) => FORMAT_GROUPS[group])
      .map((ext) => `.${ext}`)
      .join(",");
  };

  const getFileGroup = (file: File): string | null => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    for (const [group, extensions] of Object.entries(FORMAT_GROUPS)) {
      if (extensions.includes(extension || "")) {
        return group;
      }
    }
    return null;
  };

  const validateFile = (file: File): boolean => {
    setError("");

    if (!file) {
      setError("Please select a file");
      return false;
    }

    const fileGroup = getFileGroup(file);
    if (
      !fileGroup ||
      !allowedGroups.includes(fileGroup as keyof typeof FORMAT_GROUPS)
    ) {
      setError(
        `Unsupported file type. Please upload one of the supported formats.`
      );
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleConvert = () => {
    if (selectedFile) {
      onConvert(selectedFile);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setError("");
  };

  // const handleGoogleDrivePicker = () => {
  //   window.gapi.load("picker", () => {
  //     const oauthToken = "YOUR_OAUTH_TOKEN"; // You must obtain this via Google OAuth2

  //     const view = new window.google.picker.View(
  //       window.google.picker.ViewId.DOCS
  //     );
  //     const picker = new window.google.picker.PickerBuilder()
  //       .setOAuthToken(oauthToken)
  //       .addView(view)
  //       .setCallback(async (data: any) => {
  //         if (data.action === window.google.picker.Action.PICKED) {
  //           const fileId = data.docs[0].id;
  //           const fileName = data.docs[0].name;

  //           // You need to fetch the file from Google Drive using Drive API
  //           const response = await fetch(
  //             `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
  //             {
  //               headers: { Authorization: `Bearer ${oauthToken}` },
  //             }
  //           );
  //           const blob = await response.blob();
  //           const file = new File([blob], fileName, { type: blob.type });

  //           if (validateFile(file)) setSelectedFile(file);
  //         }
  //       })
  //       .build();

  //     picker.setVisible(true);
  //   });
  // };

  // const handleDropboxChooser = () => {
  //   window.Dropbox.choose({
  //     success: async (files: any[]) => {
  //       const fileData = files[0];
  //       const response = await fetch(fileData.link);
  //       const blob = await response.blob();
  //       const file = new File([blob], fileData.name, { type: blob.type });

  //       if (validateFile(file)) setSelectedFile(file);
  //     },
  //     linkType: "direct",
  //     multiselect: false,
  //     extensions: getAllowedExtensions()
  //       .split(",")
  //       .map((e) => e.trim()),
  //   });
  // };

  // const handleOneDrivePicker = () => {
  //   const odOptions = {
  //     clientId: "YOUR_ONEDRIVE_CLIENT_ID",
  //     action: "download",
  //     multiSelect: false,
  //     advanced: {
  //       filter: getAllowedExtensions(),
  //     },
  //     success: async (files: any) => {
  //       const fileData = files.value[0];
  //       const response = await fetch(fileData["@microsoft.graph.downloadUrl"]);
  //       const blob = await response.blob();
  //       const file = new File([blob], fileData.name, { type: blob.type });

  //       if (validateFile(file)) setSelectedFile(file);
  //     },
  //     cancel: () => {},
  //     error: (e: any) => {
  //       setError("OneDrive error: " + JSON.stringify(e));
  //     },
  //   };
  //   window.OneDrive.open(odOptions);
  // };

  return (
    <div className="py-8 text-center">
      <div
        className={`
          bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg 
          transition-all duration-300
          ${dragActive ? "border-2 border-emerald-500 bg-emerald-50/10" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="mb-6 transform transition-transform duration-300 hover:scale-110">
          <FileUp className="h-12 w-12 text-emerald-500 mx-auto" />
        </div>

        <div className="space-y-4">
          {!selectedFile ? (
            <>
              <p className="text-gray-600 font-semibold dark:text-gray-300 leading-relaxed">
                Drag & Drop your file
                <span className="text-emerald-500 font-medium"> here</span>
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept={getAllowedExtensions()}
              />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="w-full max-w-xs bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-500 text-white transition-all duration-200 font-semibold text-lg py-6 rounded-lg"
              >
                Choose File
              </Button>

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full max-w-xs bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-500 text-white transition-all duration-200 font-semibold text-lg py-6 rounded-lg items-center justify-center gap-2">
                    Choose File <ChevronDown className="w-5 h-5 " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-w-xs mx-auto">
                  <DropdownMenuItem
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Upload from Device
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGoogleDrivePicker}>
                    Upload from Google Drive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDropboxChooser}>
                    Upload from Dropbox
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOneDrivePicker}>
                    Upload from OneDrive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}

              {/* Hidden file input for "Upload from Device" */}
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept={getAllowedExtensions()}
              />
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm truncate max-w-[200px]">
                  {selectedFile.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleConvert}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Convert
              </Button>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Supported Formats</h3>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            {allowedGroups.map((group) => (
              <div key={group}>
                <span className="font-medium">{group}:</span>{" "}
                {FORMAT_GROUPS[group].join(", ")}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Maximum size: {maxSizeMB}MB
          </p>
        </div>
      </div>
    </div>
  );
}
