"use client";

import { ReactNode } from "react";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  caption: string;
  accent?: string;
}

export function DashboardCard({
  icon,
  title,
  value,
  caption,
  accent = "bg-blossom-100",
}: DashboardCardProps) {
  return (
    <div className="floating-card flex flex-col gap-3 p-5">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent} text-lg shadow-inner shadow-pink-100`}
        >
          {icon}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600">{caption}</p>
    </div>
  );
}
