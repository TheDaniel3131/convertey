import type { Metadata } from "next";
import { tosMetadata } from "@/app/metadata/terms-of-services";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ToS = dynamic(() => import("@/components/terms-of-service/ToS"));

export const metadata: Metadata = tosMetadata;

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <ToS />
      <Footer />
    </div>
  );
}
