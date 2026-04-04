import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evseren Mobilya | Modern & Şık Tasarımlar",
  description: "İnegöl'ün en seçkin mobilya tasarımları, modern dokunuşlar ve zamansız estetikle evinizi bekliyor.",
  keywords: ["mobilya", "inegöl mobilyası", "koltuk takımı", "yatak odası", "yemek odası", "ev dekorasyonu"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased bg-white text-neutral-900`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
