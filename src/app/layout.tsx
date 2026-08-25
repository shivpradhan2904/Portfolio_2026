// app/layout.tsx
import type { Metadata } from "next";
import { Caveat, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../Helpers/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Shiv_DEV",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.className} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0b0b0c] flex flex-col">
        {/* Pass children directly, page components will manage scroll lock */}
        {children}
      </body>
    </html>
  );
}