"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, AlertCircle } from "lucide-react";
import FileUpload from "@/components/file-upload/FileUpload";
import { downloadFile } from "@/lib/utils/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ConversionFormat } from "@/types/FileConversionFormats";
import {
  CONVERSION_MAP,
  MIME_TYPES,
  FORMAT_DESCRIPTIONS,
} from "@/lib/config/fileConversions";

export default function FileConverterWrapper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<ConversionFormat>("pdf");
  const [conversionProgress, setConversionProgress] = useState(0);

  // Get available conversion formats for the selected file
  const availableFormats = useMemo(() => {
    if (!selectedFile) return [];
    return CONVERSION_MAP[selectedFile.type] || [];
  }, [selectedFile]);

  // Set first available format when file is selected
  useMemo(() => {
    if (selectedFile && availableFormats.length > 0) {
      setTargetFormat(availableFormats[0]);
    }
  }, [selectedFile, availableFormats]);

  const handleFileConvert = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    setIsConverting(true);
    setError("");
    setConversionProgress(0);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      const fileData = Buffer.from(buffer).toString("base64");

      console.log("File type:", selectedFile.type); // Debug log
      console.log("Target format:", targetFormat); // Debug log
      console.log("File name:", selectedFile.name); // Debug log

      try {
        const response = await fetch("/api/convert/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileData,
            fileType: selectedFile.type,
            format: targetFormat,
            fileName: selectedFile.name,
          }),
        });

        console.log("Response status:", response.status); // Debug log

        if (!response.ok) {
          throw new Error(`Conversion failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const convertedData = Buffer.from(data.convertedData, "base64");
        const outputFileName =
          data.fileName || `converted-file.${targetFormat}`;

        downloadFile(convertedData, outputFileName, MIME_TYPES[targetFormat]);

        setConversionProgress(100);
      } catch (error) {
        console.error("Error during file conversion:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Conversion failed. Please try again or contact support."
        );
      } finally {
        setIsConverting(false);
      }
    };

    reader.onerror = () => {
      setError("Error reading file. Please try again.");
      setIsConverting(false);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <section className="py-16 bg-transparent rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20"></div>
      <div className="max-w-3xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
          Cosmo FileConverter
        </h2>

        <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-8 rounded-lg transition-all duration-300 hover:shadow-xl">
          <FileUpload onConvert={setSelectedFile} maxSizeMB={25} />

          {selectedFile && availableFormats.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                <div className="relative group">
                  <select
                    value={targetFormat}
                    onChange={(e) =>
                      setTargetFormat(e.target.value as ConversionFormat)
                    }
                    className="px-3 py-2 rounded-lg bg-white/10 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700"
                  >
                    {availableFormats.map((format) => (
                      <option key={format} value={format}>
                        Convert to {format.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
                    {FORMAT_DESCRIPTIONS[targetFormat]}
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full transition-all duration-300"
                  onClick={handleFileConvert}
                  disabled={isConverting}
                >
                  {isConverting ? (
                    <div className="flex items-center">
                      <span className="mr-2">Converting...</span>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-5 w-5" /> Convert Now
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                Converting: {selectedFile.name}
              </p>

              {conversionProgress > 0 && conversionProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${conversionProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {selectedFile && (
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Need a different format? Let us know!</p>
          </div>
        )}
      </div>
    </section>
  );
}
