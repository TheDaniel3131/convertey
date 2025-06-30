import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Convertey",
  description: "Securely reset your password for your Convertey account.",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
