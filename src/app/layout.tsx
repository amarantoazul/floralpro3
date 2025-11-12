import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FloralPro3",
    description:
      "Conecta proveedores, floristas, productores y agentes en una plataforma floral moderna.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="min-h-full bg-white">
      <body
        className={`${inter.variable} relative min-h-screen bg-gradient-to-b from-white via-white to-blossom-50/40 text-slate-900 antialiased`}
      >
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-24">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
