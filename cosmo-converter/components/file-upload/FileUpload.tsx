import React, { useState } from "react";
import { FileUp } from "lucide-react";

export default function FileUpload({
  onConvert,
}: {
  onConvert: (file: File) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConvert = () => {
    if (selectedFile) {
      onConvert(selectedFile);
    }
  };

  return (
    <div className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-12">Upload and Convert</h2>
      <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-lg p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 inline-block">
        <div className="mb-4 transform transition-transform duration-300 hover:scale-110 flex justify-center items-center">
          <FileUp className="h-10 w-10 text-purple-500" />
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 block mx-auto"
        />
        <button
          onClick={handleConvert}
          className="bg-purple-500 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-purple-600"
        >
          Convert
        </button>
      </div>
    </div>
  );
}
