import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import AboutUs from "@/components/about/AboutUs";

export const metadata: Metadata = {
  title: "About Us | Cosmo Converter",
  description:
    "Learn about the team behind Cosmo Converter and our mission to revolutionize file conversion across the digital universe.",
};

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
