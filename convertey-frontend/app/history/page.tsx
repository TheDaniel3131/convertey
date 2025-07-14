import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { historyMetadata } from "@/app/metadata/history";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const HistoryPage = dynamic(
  () => import("@/components/history/HistoryPage")
);

export const metadata: Metadata = historyMetadata;

export default function History() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <Suspense fallback={<p>Loading history...</p>}>
        <HistoryPage />
      </Suspense>
      <Footer />
    </div>
  );
}