"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import FAQ from "@/components/faq/FAQ";

const DonationPage = dynamic(() => import("@/components/donate/DonationPage"));

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <DonationPage />
      <FAQ />
      <Footer />
    </div>
  );
}
