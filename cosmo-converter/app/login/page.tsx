import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import type { Metadata } from "next";
import Login from "@/components/login/Login";

export const metadata: Metadata = {
  title: "Sign In | Cosmo Converter",
    description:
        "Sign in to your Cosmo Converter account to access your files, settings, and more.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="stars"></div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
}
