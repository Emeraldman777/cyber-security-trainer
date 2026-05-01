import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "warning";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-400/35",
    secondary:
      "border border-white/12 bg-white/10 text-white hover:border-sky-300/50 hover:bg-white/15",
    ghost: "text-slate-200 hover:bg-white/10",
    warning:
      "bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-lg shadow-orange-500/20",
  };

  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
