import { ReactNode } from "react";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

type ChoiceState = "neutral" | "selected" | "correct" | "incorrect" | "locked";

type ChoiceButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  state?: ChoiceState;
  onClick: () => void;
};

export function ChoiceButton({
  children,
  disabled = false,
  selected = false,
  state = selected ? "selected" : "neutral",
  onClick,
}: ChoiceButtonProps) {
  const styles: Record<ChoiceState, string> = {
    neutral:
      "border-white/10 bg-white/[0.06] text-slate-200 hover:border-violet-300/45 hover:bg-white/[0.1]",
    selected: "border-sky-300/70 bg-sky-300/15 text-white shadow-glow",
    correct:
      "animate-choice-feedback border-emerald-300/70 bg-emerald-400/15 text-white shadow-lg shadow-emerald-500/20",
    incorrect:
      "animate-choice-feedback border-rose-300/70 bg-rose-400/15 text-white shadow-lg shadow-rose-500/20",
    locked: "border-white/10 bg-white/[0.035] text-slate-500 opacity-70",
  };

  const Icon =
    state === "correct"
      ? CheckCircle2
      : state === "incorrect"
        ? XCircle
        : selected
          ? CheckCircle2
          : AlertCircle;

  return (
    <button
      className={`focus-ring flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left text-sm font-bold transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed ${styles[state]}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span>{children}</span>
      <Icon
        className={`h-5 w-5 shrink-0 ${
          state === "correct"
            ? "text-emerald-200"
            : state === "incorrect"
              ? "text-rose-200"
              : selected
                ? "text-sky-200"
                : "text-slate-600"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
