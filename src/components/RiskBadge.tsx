import { ScenarioType } from "../types";

type RiskBadgeProps = {
  type: ScenarioType;
};

export function RiskBadge({ type }: RiskBadgeProps) {
  const styles: Record<ScenarioType, string> = {
    fraud: "border-rose-300/30 bg-rose-400/10 text-rose-100",
    safe: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    ambiguous: "border-orange-300/30 bg-orange-400/10 text-orange-100",
  };
  const labels: Record<ScenarioType, string> = {
    fraud: "fraud",
    safe: "safe",
    ambiguous: "ambiguous",
  };

  return (
    <span className={`rounded-lg border px-3 py-1 text-xs font-bold uppercase tracking-wide ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}
