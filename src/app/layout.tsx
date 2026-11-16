import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreHydrator from "@/components/StoreHydrator";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WYST — Swap. Earn. Repeat.",
    template: "%s — WYST",
  },
  description:
    "WYST is a points-based clothing swap for campus communities. List what you don't wear, earn points, and spend them on something new. No cash.",
};

export const viewport: Viewport = {
  themeColor: "#040706",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <StoreHydrator />
      </body>
    </html>
  );
}
