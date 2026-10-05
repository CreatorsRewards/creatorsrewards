import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "200 700",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: "./fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet-grotesk",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CreatorsRewards — Africa's Performance Creator Platform",
    template: "%s | CreatorsRewards",
  },
  description:
    "CreatorsRewards connects African UGC creators, clippers, and micro-influencers with brands who pay for results, not promises.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${cabinetGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
