import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { organizationSchema } from "@/lib/organizationSchema";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Capitol City Tech",
    template: "%s | Capitol City Tech",
  },

  description:
    "Capitol City Tech builds modern websites for businesses in Austin and across Texas. Custom web design, development, SEO, and performance-focused solutions that help companies stand out online.",

  keywords: [
    "Austin web design",
    "Austin web development",
    "Texas web design",
    "Texas web developer",
    "small business websites",
    "website design Austin",
    "website redesign",
    "custom websites",
    "custom modern website builder",
    "website builder",
    "how to create a website",
    "how do I make a website",
    "Next.js development",
    "SEO services",
    "responsive web design",
    "Capitol City Tech",
    "capitolcitytech",
    "capitolcity.tech",
    "capital city tech",
    "cap city tech",
    "anthony tijerina"
  ],

  metadataBase: new URL("https://capitolcity.tech"),

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Capitol City Tech",
    description:
      "Modern websites designed to help businesses grow. Custom development, responsive design, and performance-focused solutions.",
    url: "https://capitolcity.tech",
    siteName: "Capitol City Tech",
    images: [
      {
        url: "/og-image.png",
        width: 1086,
        height: 630,
        alt: "Capitol City Tech",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Capitol City Tech",
    description:
      "Custom websites for growing businesses in Austin and beyond.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}