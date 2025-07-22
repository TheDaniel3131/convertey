import type { Metadata } from "next";
import ProfilePage from "@/components/user/profile/settings/ProfilePage";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "User Profile | Cosmo Converter",
  description:
    "Sign in to your Cosmo Converter account to access your files, settings, and more.",
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Suspense fallback={<p></p>}>
        <ProfilePage />
      </Suspense>
    </div>
  );
}
