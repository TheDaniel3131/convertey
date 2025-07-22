import type { Metadata } from "next";
import ChangePasswordPage from "@/components/change-password/ChangePassword";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Change Password - User Profile | Cosmo Converter",
  description:
    "Sign in to your Cosmo Converter account to access your files, settings, and more.",
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p></p>}>
        <ChangePasswordPage />
      </Suspense>
    </div>
  );
}
