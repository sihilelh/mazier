import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <label>
      {label && <span>{label}</span>}
      <input {...props} />
    </label>
  );
}
