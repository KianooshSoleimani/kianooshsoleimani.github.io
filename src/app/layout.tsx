import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const title = `${profile.name} — ${profile.currentRole.title}`;
const description = profile.subHeadline;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "Kianoosh Soleimani",
    "full-stack engineer",
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "NestJS",
    "Node.js",
    "AWS Bedrock",
    "healthcare software",
    "remote developer UK",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title,
    description,
    siteName: profile.name,
    locale: "en_GB",
    firstName: "Kianoosh",
    lastName: "Soleimani",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
