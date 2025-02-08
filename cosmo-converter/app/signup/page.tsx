import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import SignUp from "@/components/signup/SignUp";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up | Cosmo Converter",
  description:
    "Sign up for a Cosmo Converter account to access your files, settings, and more.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      <SignUp />
      <Footer />
    </div>
  );
}
