import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  style: ['normal', 'italic'],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mighty Luck",
  description: "Play your favorite games",
};

import AuthProvider from "@/context/AuthProvider";
import AuthModal from "@/components/modals/AuthModal";
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen bg-[#091741] flex flex-col items-center w-full overflow-x-hidden font-sans" suppressHydrationWarning>
        <AuthProvider>
          <Header />
          {children}
          <AuthModal />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
