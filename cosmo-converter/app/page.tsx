"use client";

import Header from "@/components/header/Header";
import Hero from "@/components/home-hero/Hero";
import Features from "@/components/home-features/Features";
import Footer from "@/components/footer/Footer";
import C2A from "@/components/call-to-action/C2A";
import FileConverterWrapper from "@/components/file-converter/FileConverterWrapper";
import { Suspense } from "react";
import FAQ from "@/components/faq/FAQ";

// import { useEffect, useState } from "react";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, []);

  // if (isLoading) {
  //   return null; // The LoadingTransition component will handle the loading state
  // }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<div>{/* Loading... */}</div>}>
        <Header />
      </Suspense>
      <main className="container mx-auto px-4 relative z-10">
        <Hero />
        <Features />
        <C2A />
        <FileConverterWrapper />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
