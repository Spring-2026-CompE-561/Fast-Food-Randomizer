// frontend/src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/ui/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <Navbar /> 
        <main>{children}</main>
      </body>
    </html>
  );
}