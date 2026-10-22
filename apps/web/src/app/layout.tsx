import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Muhammad Nizar Aulia — Technical Lead & Software Engineer",
  description:
    "Technical Lead with 7+ years designing scalable backend systems: queue microservices, database optimization, and zero-downtime ERP migrations.",
  openGraph: {
    title: "Muhammad Nizar Aulia — Technical Lead & Software Engineer",
    description: "Designing scalable backend systems and reliable web applications.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0d0d0b"
};

// Runs before first paint so revealable content is hidden only when motion is allowed.
const motionGate = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ready')}catch(e){}`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${sans.variable} ${mono.variable}`} lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
