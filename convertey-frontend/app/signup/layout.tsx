import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Cosmo Converter",
  description: "Sign up for a Cosmo Converter account to access your files, settings, and more.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
