"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import dynamic from "next/dynamic";
import React, { useState } from "react";

export default function ResetPasswordRoute() {
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamically import to avoid RSC‑to‑client mismatch warnings
  const ResetPasswordPage = dynamic(
    () => import("@/components/reset-password/ResetPassword"),
    {
      ssr: false,
      loading: () => <p className="text-center py-10">Loading…</p>,
    }
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <Header forceUnauthenticated />
      <ResetPasswordPage setIsSuccess={setIsSuccess} />
      {!isSuccess && <Footer />}
    </div>
  );
}
