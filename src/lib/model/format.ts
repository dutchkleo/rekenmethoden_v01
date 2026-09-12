const intNl = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });
const pctNl = new Intl.NumberFormat("nl-NL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const euroNl = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const euroExact = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatInt(value: number): string {
  return intNl.format(Math.round(value));
}

export function formatPct(ratio: number): string {
  if (!Number.isFinite(ratio)) return "—";
  return `${pctNl.format(ratio * 100)}%`;
}

export function formatEuro(value: number): string {
  return euroNl.format(Math.round(value));
}

export function formatEuroMonth(value: number): string {
  return `${euroExact.format(Math.round(value))}`;
}

export function formatSignedEuro(value: number): string {
  return euroNl.format(Math.round(value));
}
