import type { Metadata } from "next";
import { tosMetadata } from "@/app/metadata/terms-of-services";
import ToS from "@/components/terms-of-service/ToS";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = tosMetadata;

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <ToS />
      <Footer />
    </div>
  );
}
