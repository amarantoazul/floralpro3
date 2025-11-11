import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "FloralPro3",
  description:
    "Conecta proveedores, floristas, productores y agentes en una plataforma floral moderna.",
  metadataBase: new URL("https://floralpro3.example.com"),
  openGraph: {
    title: "FloralPro3",
    description:
      "Conecta proveedores, floristas, productores y agentes en una plataforma floral moderna.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FloralPro3",
    description:
      "Conecta proveedores, floristas, productores y agentes en una plataforma floral moderna."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-pink-50">
      <body
        className={`${inter.variable} bg-pink-50 text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
