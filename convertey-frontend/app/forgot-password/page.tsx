"use client";

import Header from "@/components/header/Header";
// import ForgotPasswordPage from "@/components/forgot-password/ForgotPassword";
// import React, { Suspense } from "react";
import dynamic from "next/dynamic";

export default function ForgotPasswordPage() {
    const ForgotPasswordPage = dynamic(() => import("@/components/forgot-password/ForgotPassword"), {
    ssr: false,
    loading: () => <p></p>,
});

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      {/* <Suspense fallback={<p>Loading header...</p>}> */}
        <Header />
      {/* </Suspense> */}
      <ForgotPasswordPage />
    </div>
  );
}
