import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVP Homeopathy - Pakistan's Homeopathic Doctors, Now Digital",
  description:
    "Find verified homeopathic doctors in Karachi, Lahore, and Islamabad. Book appointments online or bring your practice digital with Case Vault Pro.",
  keywords: [
    "homeopathy",
    "homeopathic doctor",
    "Pakistan",
    "Karachi",
    "Lahore",
    "Islamabad",
    "online booking",
    "natural healing",
  ],
  authors: [{ name: "Case Vault Pro" }],
  creator: "Case Vault Pro",
  publisher: "Case Vault Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://homeo.casevaultpro.com",
    title: "CVP Homeopathy - Pakistan's Homeopathic Doctors, Now Digital",
    description:
      "Find verified homeopathic doctors in Karachi, Lahore, and Islamabad. Book appointments online.",
    siteName: "CVP Homeopathy",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVP Homeopathy - Pakistan's Homeopathic Doctors, Now Digital",
    description:
      "Find verified homeopathic doctors in Karachi, Lahore, and Islamabad.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

// Made with Bob
