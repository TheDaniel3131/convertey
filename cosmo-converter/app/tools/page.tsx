import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import FileConverterWrapper from "@/components/file-converter/FileConverterWrapper";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tools | Cosmo Converter",
  description: "Access various tools provided by Cosmo Converter.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <FileConverterWrapper />
      <Footer />
    </div>
  );
}
