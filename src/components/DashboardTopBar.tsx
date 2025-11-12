"use client";

import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export function DashboardTopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-base font-semibold text-slate-900">
          FloralPro3
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
