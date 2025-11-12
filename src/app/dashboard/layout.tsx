"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { DashboardNav } from "@/components/DashboardNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blossom-50 via-white to-white text-slate-800">
      <DashboardTopBar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full px-4 py-6 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">{children}</div>
      </motion.main>
      <DashboardNav />
    </div>
  );
}
