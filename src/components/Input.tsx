import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

export function Input({ label, icon, className = "", ...props }: InputProps) {
  return (
    <label className="flex items-center gap-2">
      {(label || icon) && (
        <span className="flex items-center gap-1.5 text-muted text-sm font-mono whitespace-nowrap select-none">
          {icon && <span className="flex items-center shrink-0">{icon}</span>}
          {label}
        </span>
      )}
      <input
        className={`w-20 min-h-11 px-2 border-2 border-ink rounded-sm
          bg-paper-light text-ink font-mono text-sm text-center
          appearance-none
          focus:border-accent focus:outline-none
          ${className}`}
        {...props}
      />
    </label>
  );
}
