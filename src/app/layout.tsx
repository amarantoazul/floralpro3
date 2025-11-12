// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FloralPro3",
  description: "Conecta proveedores, florerías, productores y agentes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} min-h-screen bg-white text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}

