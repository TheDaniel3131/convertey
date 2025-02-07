import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { aboutusMetadata } from "@/app/metadata/about";
import dynamic from "next/dynamic";

const AboutUs = dynamic(() => import("@/components/about/AboutUs"));

export const metadata: Metadata = aboutusMetadata;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <AboutUs />
      <Footer />
    </div>
  );
}
