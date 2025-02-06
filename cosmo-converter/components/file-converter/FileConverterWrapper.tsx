"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import FileUpload from "@/components/file-upload/FileUpload";
import { downloadFile } from "@/lib/utils";

export default function FileConverterWrapper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileConvert = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    setIsConverting(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      const fileData = Buffer.from(buffer).toString("base64");

      try {
        const response = await fetch("/api/convert/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileData: fileData,
            fileType: selectedFile.type,
            format: "png",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const convertedData = Buffer.from(data.convertedData, "base64");

        if (selectedFile.type.startsWith("image/")) {
          downloadFile(convertedData, "converted-image.png", "image/png");
        } else if (selectedFile.type === "application/pdf") {
          downloadFile(
            convertedData,
            "converted-document.pdf",
            "application/pdf"
          );
        } else {
          alert("Unsupported file type");
        }
      } catch (error) {
        console.error("Error during file conversion:", error);
        alert("An error occurred during file conversion. Please try again.");
      } finally {
        setIsConverting(false);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <section className="py-16 bg-transparent rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 opacity-50 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center dark:bg-[url('/placeholder-dark.svg?height=400&width=800')]"></div>
      <div className="max-w-3xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
          Cosmo FileConverter
        </h2>
        <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-8 rounded-lg transition-all duration-300 hover:shadow-xl">
          <FileUpload onConvert={setSelectedFile} />
          <div className="mt-6 flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full transition-all duration-300"
              onClick={handleFileConvert}
              disabled={!selectedFile || isConverting}
            >
              {isConverting ? (
                <>Converting...</>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" /> Launch Conversion
                </>
              )}
            </Button>
          </div>
          {selectedFile && (
            <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
