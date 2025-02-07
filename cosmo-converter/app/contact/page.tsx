import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Cosmo Converter",
  description:
    "Get in touch with the CosmoCrafters team for support, feedback, or partnership inquiries about Cosmo Converter.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />

      <Footer />
    </div>
  );
}
