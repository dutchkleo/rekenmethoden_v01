import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NumberFieldProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  ariaLabel: string;
  className?: string;
};

export function NumberField({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  ariaLabel,
  className,
}: NumberFieldProps) {
  return (
    <input
      type="number"
      inputMode="decimal"
      aria-label={ariaLabel}
      min={min}
      max={max}
      step={step}
      value={Number.isFinite(value) ? value : 0}
      onChange={(event) => {
        const next = event.target.value === "" ? 0 : Number(event.target.value);
        if (!Number.isNaN(next)) onChange(next);
      }}
      onWheel={(event) => event.currentTarget.blur()}
      className={cn(
        "h-10 w-full min-w-16 rounded-sm bg-input px-2 text-right text-sm text-fg tabular-nums shadow-card",
        "transition-[box-shadow] duration-150 ease-[var(--ease-out)]",
        "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none",
        className,
      )}
    />
  );
}

type TextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
};

export function TextField({ value, onChange, ariaLabel, className }: TextFieldProps) {
  return (
    <input
      type="text"
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "h-10 w-full rounded-sm bg-input px-2.5 text-sm text-fg shadow-card",
        "transition-[box-shadow] duration-150 ease-[var(--ease-out)]",
        "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none",
        className,
      )}
    />
  );
}

export function CalcCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 min-w-16 items-center justify-end rounded-sm bg-calc px-2 text-sm tabular-nums text-fg",
        className,
      )}
    >
      {children}
    </div>
  );
}
