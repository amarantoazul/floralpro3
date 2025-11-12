"use client";

import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Roles } from "@/components/Roles";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="flex flex-1 flex-col gap-16 pt-6"
      >
        <Hero />
        <Roles />
      </motion.main>

      <Footer />
    </div>
  );
}
