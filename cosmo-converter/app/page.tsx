"use client";

import Header from "@/components/header/Header";
import Hero from "@/components/home-hero/Hero";
import Features from "@/components/home-features/Features";
import Footer from "@/components/footer/Footer";
import C2A from "@/components/call-to-action/C2A";
import FileConverterWrapper from "@/components/file-converter/FileConverterWrapper";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 
    transition-colors duration-300"
    >
      <div className="stars"></div>
      <Header />
      <main className="container mx-auto px-4 relative z-10">
        <Hero />
        <Features />
        <C2A />
        <FileConverterWrapper />
      </main>
      <Footer />
    </div>
  );
}
