import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lekha — Legal documents, done right.",
  description:
    "35+ screen-reader-native legal templates for compliance, HR, contracts, property and family. Starting with India, expanding worldwide.",
  openGraph: {
    title: "Lekha — Legal documents, done right.",
    description:
      "Fill online, download as DOCX. India, UK, US, Singapore and more — rolling out.",
    url: "https://lekha.elevana.guru",
    siteName: "Lekha",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
