import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NotFound from "@/components/not-found/NotFound";
import { notFound404Metadata } from "@/app/metadata/not-found";
import React, { Suspense } from "react";

export const metadata: Metadata = notFound404Metadata;

export default function NotFound404() {
  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 
    transition-colors duration-300"
    >
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <NotFound />
      <Footer />
    </div>
  );
}
