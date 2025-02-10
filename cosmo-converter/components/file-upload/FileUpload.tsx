import React, { useState } from "react";
import { FileUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Expanded supported file types with their extensions

// Group formats for display
const FORMAT_GROUPS = {
  'Images': ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  'Documents': ['pdf', 'doc', 'docx', 'rtf'],
  'Spreadsheets': ['xls', 'xlsx', 'csv'],
  'Presentations': ['ppt', 'pptx'],
  'Text': ['txt', 'md'],
  'eBooks': ['epub']
};

type FileUploadProps = {
  onConvert: (file: File) => void;
  maxSizeMB?: number;
  allowedGroups?: Array<keyof typeof FORMAT_GROUPS>;
};

export default function FileUpload({ 
  onConvert, 
  maxSizeMB = 25,
  allowedGroups = Object.keys(FORMAT_GROUPS) as Array<keyof typeof FORMAT_GROUPS>
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  // Get allowed extensions based on allowed groups
  const getAllowedExtensions = () => {
    return allowedGroups
      .flatMap(group => FORMAT_GROUPS[group])
      .map(ext => `.${ext}`)
      .join(',');
  };


  const getFileGroup = (file: File): string | null => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    for (const [group, extensions] of Object.entries(FORMAT_GROUPS)) {
      if (extensions.includes(extension || '')) {
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
    if (!fileGroup || !allowedGroups.includes(fileGroup as keyof typeof FORMAT_GROUPS)) {
      setError(`Unsupported file type. Please upload one of the supported formats.`);
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

  return (
    <div className="py-8 text-center">
      <div 
        className={`
          bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg 
          transition-all duration-300 hover:shadow-xl 
          ${dragActive ? 'border-2 border-purple-500 bg-purple-50/10' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="mb-6 transform transition-transform duration-300 hover:scale-110">
          <FileUp className="h-12 w-12 text-purple-500 mx-auto" />
        </div>

        <div className="space-y-4">
          {!selectedFile ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Drag and drop your file here or click to browse
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept={getAllowedExtensions()}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="w-full max-w-xs"
              >
                Choose File
              </Button>
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
                className="bg-purple-500 hover:bg-purple-600 text-white"
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
            {allowedGroups.map(group => (
              <div key={group}>
                <span className="font-medium">{group}:</span>{' '}
                {FORMAT_GROUPS[group].join(', ')}
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