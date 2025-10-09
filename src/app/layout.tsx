import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PharmacyProvider } from "@/contexts/PharmacyContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmaZGZ - Farmacias de Guardia de Zaragoza",
  description:
    "Farmacias de Guardia de Zaragoza del dia actual, datos proporcionados por el Ayunta de Zaragoza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <AuthProvider>
          <PharmacyProvider>
            <div className="farma-bg-gradient min-h-screen">
              <Navbar />
              <main>{children}</main>
            </div>
            <Footer />
          </PharmacyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
