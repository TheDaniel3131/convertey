"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import FileConverterWrapper from "@/components/file-converter/FileConverterWrapper";
// import { Suspense } from "react";
// import FAQ from "@/components/faq/FAQ";
// import C2A from "@/components/call-to-action/C2A";
// import Hero from "@/components/home-hero/Hero";
// import Features from "@/components/home-features/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <main className="container mx-auto px-4 relative z-10">
        <FileConverterWrapper />
        {/* <Features />
        <C2A />
        <FAQ /> */}
      </main>
      <Footer />
    </div>
  );
}
