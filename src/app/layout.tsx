import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PharmacyProvider } from "@/contexts/PharmacyContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

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
    "Farmacias de Guardia de Zaragoza del dia actual, datos proporcionados por el Ayuntamiento de Zaragoza",
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
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#fff",
                  color: "#1f2937",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  padding: "12px 16px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                },
                success: {
                  duration: 3000,
                  style: {
                    background: "#f0fdf4",
                    color: "#166534",
                    border: "1px solid #86efac",
                  },
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#fff",
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: "#fef2f2",
                    color: "#991b1b",
                    border: "1px solid #fca5a5",
                  },
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                },
                loading: {
                  style: {
                    background: "#eff6ff",
                    color: "#1e40af",
                    border: "1px solid #93c5fd",
                  },
                  iconTheme: {
                    primary: "#3b82f6",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </PharmacyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
