import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import { contactusMetadata } from "@/app/metadata/contact";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import FAQ from "@/components/faq/FAQ";

const ContactUs = dynamic(() => import("@/components/contact/ContactUs"));

export const metadata: Metadata = contactusMetadata;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <ContactUs />
      <FAQ />
      <Footer />
    </div>
  );
}
