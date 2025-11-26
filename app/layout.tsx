import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { casaGrande, strawFord, atomicMarker } from "@/assets/fonts";
import { Header } from "@/components/Header/Header";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Playtest | Lezoo",
  description: "Apply to become a playtester for Le Zoo where you can win rewards, be a part of an exclusive discord channel and impact how Le Zoo gets built!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${casaGrande.variable} ${strawFord.variable} ${atomicMarker.variable} antialiased`}
      >
        <Header />
        <div className="bg-raisin-black-2">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
