"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
// import ResetPasswordPage from "@/components/reset-password/ResetPassword";
import dynamic from "next/dynamic";
import React, { useState } from "react";

export default function ResetPasswordRoute() {
  const [isSuccess, setIsSuccess] = useState(false);
  const ResetPasswordPage = dynamic(() => import("@/components/reset-password/ResetPassword"), {
  ssr: false,
  loading: () => <p></p>,
});

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      {/* <Suspense fallback={<p>Loading header...</p>}> */}
        <Header />
      {/* </Suspense> */}
      <ResetPasswordPage setIsSuccess={setIsSuccess} />
      {!isSuccess && <Footer />}
    </div>
  );
}
