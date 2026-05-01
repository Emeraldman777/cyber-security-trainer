import { ReactNode } from "react";

type MetricCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  caption: string;
};

export function MetricCard({ icon, title, value, caption }: MetricCardProps) {
  return (
    <div className="soft-card rounded-lg p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sky-200">
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-300">{title}</p>
      <p className="mt-1 text-2xl font-extrabold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{caption}</p>
    </div>
  );
}
