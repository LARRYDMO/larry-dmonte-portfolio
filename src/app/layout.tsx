import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Larry Dmonte – AI & Software Engineer",
  description: "Portfolio of Larry Dmonte – AI & Software Engineer building intelligent systems that learn and scale.",
  icons: {
    // Use the SVG in /public to avoid Next trying to decode the ICO in src/app
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased ai-theme font-sans relative overflow-x-hidden">
        {/* Global persistent background video */}
        <video className="bg-video" autoPlay loop muted playsInline>
          <source src="/videos/ML.mp4" type="video/mp4" />
        </video>
        <div className="ai-hero-bg" aria-hidden="true" />
        <ErrorReporter />
        {/* Route change messenger (kept in case still required by visual edit tooling) */}
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="false"
          data-custom-data='{"appName": "LarryPortfolio", "version": "1.0.0"}'
        />
        <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
