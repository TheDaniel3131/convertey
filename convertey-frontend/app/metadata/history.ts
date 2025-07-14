import type { Metadata } from "next";

export const historyMetadata: Metadata = {
  title: "Conversion History - Convertey",
  description: "View and manage your file conversion history. Track completed, processing, and failed conversions with easy download and retry options.",
  keywords: [
    "conversion history",
    "file conversion tracking",
    "download converted files",
    "conversion status",
    "file converter history",
    "Convertey history"
  ],
  authors: [{ name: "Convertey Team" }],
  creator: "Convertey",
  publisher: "Convertey",
  robots: {
    index: false, // Usually you don't want search engines to index user-specific pages
    follow: true,
  },
  openGraph: {
    title: "Conversion History - Convertey",
    description: "View and manage your file conversion history with Convertey's comprehensive tracking system.",
    url: "https://convertey.com/history",
    siteName: "Convertey",
    type: "website",
    images: [
      {
        url: "https://convertey.com/og-history.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Convertey History Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversion History - Convertey",
    description: "Track and manage your file conversions with Convertey's history feature.",
    images: ["https://convertey.com/twitter-history.jpg"], // You'll need to create this image
  },
  alternates: {
    canonical: "https://convertey.com/history",
  },
};