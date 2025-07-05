import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { pricingMetadata } from "@/app/metadata/pricing";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import FeaturesComparison from "@/components/features/FeaturesComparison";
import AboutPricing from "@/components/faq/AboutPricing";
import PayPerUseSection from "@/components/features/PayPerUseSection";

const Pricing = dynamic(() => import("@/components/pricing/Pricing"));

export const metadata: Metadata = pricingMetadata;

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <Pricing />
      <FeaturesComparison />
      <PayPerUseSection />
      <AboutPricing />
      <Footer />
    </div>
  );
}
