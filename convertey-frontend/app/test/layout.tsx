import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NotificationsProvider } from "@/components/contexts/NotificationsContext";
import { Toaster } from "sonner";
// import LoadingTransition from "@/components/Transitioning";
import Script from "next/script";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convert Your Files Online | Convertey ",
  description:
    "Effortlessly convert with any file formats including documents, images, presentations, archives, audio, and video files with Convertey. Experience seamless and provided free file conversion from us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* External Scripts */}
        <Script
          src="https://apis.google.com/js/api.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.dropbox.com/static/api/2/dropins.js"
          strategy="beforeInteractive"
          id="dropboxjs"
          data-app-key={process.env.NEXT_PUBLIC_DROPBOX_APP_KEY}
        />
        <Script
          src="https://js.live.net/v7.2/OneDrive.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
        <meta name="apple-mobile-web-app-title" content="Convertey" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <LoadingTransition> */}
        <NotificationsProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </NotificationsProvider>
        {/* </LoadingTransition> */}
        <Toaster />
      </body>
    </html>
  );
}
