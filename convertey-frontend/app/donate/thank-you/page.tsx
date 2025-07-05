"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ThankYouPage from "@/components/donate/thank-you/ThankYouDonation";
import React, { Suspense } from "react";

export default function ThankYouDonationPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <ThankYouPage />
      <Footer />
    </div>
  );
}
