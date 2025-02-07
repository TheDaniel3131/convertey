import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";
import { privacyPolicyMetadata } from "@/app/metadata/privacy-policy";

export const metadata: Metadata = privacyPolicyMetadata;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}
