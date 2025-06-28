import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import FAQ from "@/components/faq/FAQ";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "FAQ | Cosmo Converter",
  description: "Frequently Asked Questions about Cosmo Converter.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <FAQ />
      <Footer />
    </div>
  );
}
