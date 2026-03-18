import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

export function Button({ children, icon, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 border-2 border-ink rounded-sm
        bg-transparent text-ink font-mono uppercase tracking-[0.08em] text-sm
        min-h-11 px-4 cursor-pointer select-none
        transition-colors duration-150
        hover:bg-ink hover:text-paper
        active:bg-accent active:border-accent active:text-paper
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
        ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
