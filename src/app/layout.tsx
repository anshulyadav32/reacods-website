import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import Navbar from "@/components/Navbar";
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
  title: "AllWebsite - Manage Your Websites",
  description: "A comprehensive platform to manage and track all your websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <ClientSessionProvider>
          <Navbar />
          <main>{children}</main>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
