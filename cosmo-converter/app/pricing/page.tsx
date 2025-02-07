import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { pricingMetadata } from "@/app/metadata/pricing";
import Pricing from "@/components/pricing/Pricing";

export const metadata: Metadata = pricingMetadata;

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <Pricing />
      <Footer />
    </div>
  );
}
