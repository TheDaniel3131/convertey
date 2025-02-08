import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { privacyPolicyMetadata } from "@/app/metadata/privacy-policy";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const PrivacyPolicy = dynamic(
  () => import("@/components/privacy/PrivacyPolicy")
);

export const metadata: Metadata = privacyPolicyMetadata;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}
