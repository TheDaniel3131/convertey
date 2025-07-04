"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import SignUp from "@/components/signup/SignUp";
import React, { useState, Suspense } from "react";

export default function SignUpPage() {
  const [showVerification, setShowVerification] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p></p>}>
        <Header />
      </Suspense>
      <SignUp 
        showVerification={showVerification}
        setShowVerification={setShowVerification}
      />
      {!showVerification && <Footer />}
    </div>
  );
}
