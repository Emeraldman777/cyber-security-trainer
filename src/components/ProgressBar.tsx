type ProgressBarProps = {
  value: number;
  label?: string;
  tone?: "blue" | "violet" | "orange" | "red" | "green";
};

export function ProgressBar({ value, label, tone = "blue" }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const tones = {
    blue: "from-sky-300 to-blue-500",
    violet: "from-violet-300 to-fuchsia-500",
    orange: "from-orange-300 to-amber-500",
    red: "from-orange-400 to-rose-500",
    green: "from-emerald-300 to-teal-500",
  };

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-200">{label}</span>
          <span className="font-bold text-white">{clamped}</span>
        </div>
      ) : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tones[tone]} transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
