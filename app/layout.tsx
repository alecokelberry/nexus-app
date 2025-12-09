import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google"; // Verify if Plus_Jakarta_Sans is actually used/available or if I should stick to Inter. 
// The file view showed Plus_Jakarta_Sans.
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans", // Check if this matches the view
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Southern Utah ENT",
  description: "Unified Patient Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
