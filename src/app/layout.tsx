import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  themeColor: "#EAE1D2",
};

const pageTitle = `${siteConfig.brand.name} | Websites & Business Software`;
const pageDescription =
  "Omtech Modern Solutions designs and builds websites, landing pages and business software such as CRMs, ERPs and booking systems for small and growing companies.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.siteUrl),
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Omtech Modern Solutions",
    "website development",
    "landing page design",
    "custom CRM",
    "custom ERP",
    "booking system",
    "business software",
    "workflow automation",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.brand.siteUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: siteConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] selection:bg-[var(--terracotta)] selection:text-[var(--surface)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--ink)] focus:text-[var(--surface)] focus:text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
