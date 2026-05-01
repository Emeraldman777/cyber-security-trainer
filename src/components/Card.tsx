import { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export function Card({ children, className = "", interactive = false, ...props }: CardProps) {
  return (
    <div
      className={`glass-card rounded-lg p-5 ${
        interactive
          ? "transition duration-200 hover:-translate-y-1 hover:border-sky-300/40 hover:bg-white/[0.1]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
