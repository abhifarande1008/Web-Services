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

export const metadata: Metadata = {
  metadataBase: new URL("https://farandestudio.com"),
  title: `${siteConfig.brand.name} | Web Services & App Services for Businesses`,
  description: `${siteConfig.brand.tagline} Websites, landing pages and business software (CRM, ERP and custom tools), designed and built end to end by one developer.`,
  keywords: [
    "Web Services",
    "App Services",
    "Custom CRM",
    "Custom ERP",
    "Next.js Developer",
    "Full-Stack Freelance Engineer",
    "Landing Page Sprint",
    "Workflow Automation",
    "Business Software",
  ],
  authors: [{ name: siteConfig.brand.founder }],
  creator: siteConfig.brand.founder,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farandestudio.com",
    title: `${siteConfig.brand.name} — Web Services & App Services`,
    description: siteConfig.brand.tagline,
    siteName: siteConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} — Web Services & App Services`,
    description: siteConfig.brand.tagline,
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
        {children}
      </body>
    </html>
  );
}
