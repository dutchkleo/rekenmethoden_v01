import { i as __toESM } from "../_runtime.mjs";
import { a as Overlay2, c as Title2, d as require_jsx_runtime, f as require_react, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, u as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Plus, i as RotateCcw, o as Download, r as Trash2, s as Check, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CDCO4MOn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function NumberField({ value, onChange, min = 0, max, step = 1, ariaLabel, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		inputMode: "decimal",
		"aria-label": ariaLabel,
		min,
		max,
		step,
		value: Number.isFinite(value) ? value : 0,
		onChange: (event) => {
			const next = event.target.value === "" ? 0 : Number(event.target.value);
			if (!Number.isNaN(next)) onChange(next);
		},
		onWheel: (event) => event.currentTarget.blur(),
		className: cn("h-10 w-full min-w-16 rounded-sm bg-input px-2 text-right text-sm text-fg tabular-nums shadow-card", "transition-[box-shadow] duration-150 ease-[var(--ease-out)]", "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none", className)
	});
}
function TextField({ value, onChange, ariaLabel, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		"aria-label": ariaLabel,
		value,
		onChange: (event) => onChange(event.target.value),
		className: cn("h-10 w-full rounded-sm bg-input px-2.5 text-sm text-fg shadow-card", "transition-[box-shadow] duration-150 ease-[var(--ease-out)]", "focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none", className)
	});
}
function CalcCell({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-10 min-w-16 items-center justify-end rounded-sm bg-calc px-2 text-sm tabular-nums text-fg", className),
		children
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-card hover:opacity-90",
			secondary: "bg-surface text-fg shadow-card hover:bg-card",
			ghost: "text-muted hover:bg-surface hover:text-fg",
			outline: "bg-transparent text-fg shadow-card hover:bg-surface",
			danger: "bg-danger text-danger-fg shadow-card hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3",
			icon: "size-11",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
Button.displayName = "Button";
var intNl = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });
var pctNl = new Intl.NumberFormat("nl-NL", {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});
var euroNl = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	maximumFractionDigits: 0
});
var euroExact = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR",
	maximumFractionDigits: 0
});
function formatInt(value) {
	return intNl.format(Math.round(value));
}
function formatPct(ratio) {
	if (!Number.isFinite(ratio)) return "—";
	return `${pctNl.format(ratio * 100)}%`;
}
function formatEuro(value) {
	return euroNl.format(Math.round(value));
}
function formatEuroMonth(value) {
	return `${euroExact.format(Math.round(value))}`;
}
function activeScenario(model) {
	return model.scenarios.find((item) => item.id === model.activeScenarioId) ?? model.scenarios[0];
}
function computeHousing(group) {
	const matched = Math.max(0, Math.min(group.demand, group.available, group.quality, group.affordable));
	const shortfall = Math.max(0, group.demand - matched);
	const coverage = group.demand > 0 ? matched / group.demand : 0;
	return {
		...group,
		matched,
		shortfall,
		coverage
	};
}
function computeHousehold(household, adult, child) {
	const basicIncome = household.adults * adult + household.children * child;
	const resources = household.otherIncome + basicIncome;
	const minimum = household.housingEnergy + household.otherMin;
	const saldo = resources - minimum;
	const gap = Math.max(0, -saldo);
	const sufficient = saldo >= 0;
	const ratio = minimum > 0 ? Math.min(1, resources / minimum) : 1;
	const joint = sufficient && household.adequateHome;
	return {
		...household,
		basicIncome,
		resources,
		minimum,
		saldo,
		gap,
		sufficient,
		ratio,
		joint
	};
}
function computeTotals(model) {
	return totalsForScenario(model, activeScenario(model));
}
function totalsForScenario(model, scenario) {
	const housing = model.housing.map(computeHousing);
	const demand = housing.reduce((sum, row) => sum + row.demand, 0);
	const available = housing.reduce((sum, row) => sum + row.available, 0);
	const quality = housing.reduce((sum, row) => sum + row.quality, 0);
	const affordable = housing.reduce((sum, row) => sum + row.affordable, 0);
	const matched = housing.reduce((sum, row) => sum + row.matched, 0);
	const shortfall = housing.reduce((sum, row) => sum + row.shortfall, 0);
	const housingCoverage = demand > 0 ? matched / demand : 0;
	let lowestGroupCoverage = housing.length ? housing[0].coverage : 0;
	let lowestGroupName = housing.length ? housing[0].name : "—";
	for (const row of housing) if (row.coverage < lowestGroupCoverage) {
		lowestGroupCoverage = row.coverage;
		lowestGroupName = row.name;
	}
	const households = model.households.map((row) => computeHousehold(row, scenario.adult, scenario.child));
	const totalWeight = households.reduce((sum, row) => sum + row.weight, 0);
	const incomeCoverage = totalWeight > 0 ? households.reduce((sum, row) => sum + row.weight * (row.sufficient ? 1 : 0), 0) / totalWeight : 0;
	const jointCoverage = totalWeight > 0 ? households.reduce((sum, row) => sum + row.weight * (row.joint ? 1 : 0), 0) / totalWeight : 0;
	const gapMass = households.reduce((sum, row) => sum + row.weight * row.gap, 0);
	const shortWeight = households.reduce((sum, row) => sum + (row.sufficient ? 0 : row.weight), 0);
	const avgGapAll = totalWeight > 0 ? gapMass / totalWeight : 0;
	const avgGapIfShort = shortWeight > 0 ? gapMass / shortWeight : 0;
	const grossCost = 12 * (scenario.adult * model.finance.adultRecipients + scenario.child * model.finance.childRecipients);
	const netCost = grossCost + model.finance.adminCost - model.finance.extraTax - model.finance.savings;
	return {
		demand,
		available,
		quality,
		affordable,
		matched,
		shortfall,
		housingCoverage,
		lowestGroupCoverage,
		lowestGroupName,
		incomeCoverage,
		jointCoverage,
		avgGapAll,
		avgGapIfShort,
		shortWeight,
		totalWeight,
		grossCost,
		netCost,
		adult: scenario.adult,
		child: scenario.child,
		scenarioName: scenario.name
	};
}
function computeScenarioResults(model) {
	return model.scenarios.map((scenario) => {
		const totals = totalsForScenario(model, scenario);
		return {
			id: scenario.id,
			name: scenario.name,
			adult: scenario.adult,
			child: scenario.child,
			incomeCoverage: totals.incomeCoverage,
			jointCoverage: totals.jointCoverage,
			avgGapIfShort: totals.avgGapIfShort,
			grossCost: totals.grossCost,
			netCost: totals.netCost
		};
	});
}
function seedModel() {
	return {
		area: "Nederland – voorbeeldgebied",
		asOf: "2026-12-31",
		priceLevel: "september 2026",
		targetCoverage: .95,
		activeScenarioId: 2,
		scenarios: [
			{
				id: 1,
				name: "Zonder basisinkomen",
				adult: 0,
				child: 0
			},
			{
				id: 2,
				name: "Laag",
				adult: 800,
				child: 0
			},
			{
				id: 3,
				name: "Midden",
				adult: 1e3,
				child: 150
			},
			{
				id: 4,
				name: "Hoog",
				adult: 1200,
				child: 250
			},
			{
				id: 5,
				name: "Ruim",
				adult: 1400,
				child: 350
			}
		],
		housing: [
			{
				id: uid(),
				name: "Alleenstaande · Stad Centrum",
				demand: 1e3,
				available: 850,
				quality: 800,
				affordable: 760
			},
			{
				id: uid(),
				name: "Paar zonder kinderen · Stad Centrum",
				demand: 600,
				available: 550,
				quality: 520,
				affordable: 500
			},
			{
				id: uid(),
				name: "Gezin met kinderen · Stad Noord",
				demand: 750,
				available: 680,
				quality: 650,
				affordable: 610
			},
			{
				id: uid(),
				name: "Alleenstaande oudere · Regio Oost",
				demand: 400,
				available: 300,
				quality: 280,
				affordable: 240
			},
			{
				id: uid(),
				name: "Huishouden met beperking · Regio Oost",
				demand: 180,
				available: 110,
				quality: 95,
				affordable: 80
			},
			{
				id: uid(),
				name: "Starter · Regio Zuid",
				demand: 500,
				available: 390,
				quality: 370,
				affordable: 320
			}
		],
		households: [
			{
				id: uid(),
				name: "Alleenstaande werkend",
				adults: 1,
				children: 0,
				weight: 800,
				otherIncome: 1650,
				housingEnergy: 850,
				otherMin: 950,
				adequateHome: true
			},
			{
				id: uid(),
				name: "Alleenstaande zonder werk",
				adults: 1,
				children: 0,
				weight: 600,
				otherIncome: 950,
				housingEnergy: 760,
				otherMin: 950,
				adequateHome: true
			},
			{
				id: uid(),
				name: "Paar zonder kinderen",
				adults: 2,
				children: 0,
				weight: 500,
				otherIncome: 2100,
				housingEnergy: 950,
				otherMin: 1400,
				adequateHome: true
			},
			{
				id: uid(),
				name: "Gezin met twee kinderen",
				adults: 2,
				children: 2,
				weight: 650,
				otherIncome: 2400,
				housingEnergy: 1150,
				otherMin: 1900,
				adequateHome: true
			},
			{
				id: uid(),
				name: "Alleenstaande oudere",
				adults: 1,
				children: 0,
				weight: 350,
				otherIncome: 1450,
				housingEnergy: 780,
				otherMin: 1e3,
				adequateHome: true
			},
			{
				id: uid(),
				name: "Beperking en hoge zorgkosten",
				adults: 1,
				children: 0,
				weight: 120,
				otherIncome: 1200,
				housingEnergy: 850,
				otherMin: 1250,
				adequateHome: true
			},
			{
				id: uid(),
				name: "Starter zonder adequate woning",
				adults: 1,
				children: 0,
				weight: 400,
				otherIncome: 1500,
				housingEnergy: 900,
				otherMin: 950,
				adequateHome: false
			}
		],
		finance: {
			adultRecipients: 1e4,
			childRecipients: 2e3,
			adminCost: 5e6,
			extraTax: 25e6,
			savings: 15e6
		}
	};
}
var useModelStore = create()(persist((set) => ({
	...seedModel(),
	setMeta: (patch) => set(patch),
	setScenario: (id) => set({ activeScenarioId: id }),
	updateScenario: (id, patch) => set((state) => ({ scenarios: state.scenarios.map((item) => item.id === id ? {
		...item,
		...patch
	} : item) })),
	updateHousing: (id, patch) => set((state) => ({ housing: state.housing.map((item) => item.id === id ? {
		...item,
		...patch
	} : item) })),
	addHousing: () => set((state) => ({ housing: [...state.housing, {
		id: uid(),
		name: "Nieuwe woninggroep",
		demand: 0,
		available: 0,
		quality: 0,
		affordable: 0
	}] })),
	removeHousing: (id) => set((state) => ({ housing: state.housing.filter((item) => item.id !== id) })),
	updateHousehold: (id, patch) => set((state) => ({ households: state.households.map((item) => item.id === id ? {
		...item,
		...patch
	} : item) })),
	addHousehold: () => set((state) => ({ households: [...state.households, {
		id: uid(),
		name: "Nieuw huishoudtype",
		adults: 1,
		children: 0,
		weight: 0,
		otherIncome: 0,
		housingEnergy: 0,
		otherMin: 0,
		adequateHome: true
	}] })),
	removeHousehold: (id) => set((state) => ({ households: state.households.filter((item) => item.id !== id) })),
	updateFinance: (patch) => set((state) => ({ finance: {
		...state.finance,
		...patch
	} })),
	reset: () => set(seedModel())
}), {
	name: "rekenmethode-v01",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	version: 1,
	partialize: (state) => ({
		area: state.area,
		asOf: state.asOf,
		priceLevel: state.priceLevel,
		targetCoverage: state.targetCoverage,
		activeScenarioId: state.activeScenarioId,
		scenarios: state.scenarios,
		housing: state.housing,
		households: state.households,
		finance: state.finance
	})
}));
function HousingSheet() {
	const housing = useModelStore((state) => state.housing);
	const updateHousing = useModelStore((state) => state.updateHousing);
	const addHousing = useModelStore((state) => state.addHousing);
	const removeHousing = useModelStore((state) => state.removeHousing);
	const rows = housing.map(computeHousing);
	const totals = {
		demand: rows.reduce((sum, row) => sum + row.demand, 0),
		available: rows.reduce((sum, row) => sum + row.available, 0),
		quality: rows.reduce((sum, row) => sum + row.quality, 0),
		affordable: rows.reduce((sum, row) => sum + row.affordable, 0),
		matched: rows.reduce((sum, row) => sum + row.matched, 0),
		shortfall: rows.reduce((sum, row) => sum + row.shortfall, 0),
		housingCoverage: rows.reduce((sum, row) => sum + row.demand, 0) > 0 ? rows.reduce((sum, row) => sum + row.matched, 0) / rows.reduce((sum, row) => sum + row.demand, 0) : 0
	};
	const lowest = rows.reduce((min, row) => Math.min(min, row.coverage), rows[0]?.coverage ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "woningvoorraad",
		className: "scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-subtle uppercase",
						children: "Rekenblad 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight text-fg",
						children: "Adequate woningvoorraad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-2xl text-sm leading-normal text-muted",
						children: "Een woning telt pas mee wanneer zij werkelijk beschikbaar, geschikt, betaalbaar en adequaat van kwaliteit, locatie en woonzekerheid is."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: addHousing,
					className: "h-11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Woninggroep toevoegen"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[52rem] border-separate border-spacing-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-primary text-primary-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "rounded-tl-md px-3 py-3 text-left text-xs font-medium",
									children: "Woninggroep"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "px-3 py-3 text-right text-xs font-medium",
									children: ["Behoefte D", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "g" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 text-right text-xs font-medium",
									children: "Beschikbaar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 text-right text-xs font-medium",
									children: "Kwaliteit, locatie, zekerheid"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3 text-right text-xs font-medium",
									children: "Betaalbaar en adequaat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "px-3 py-3 text-right text-xs font-medium",
									children: ["Gekoppeld M", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "g" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									className: "px-3 py-3 text-right text-xs font-medium",
									children: ["Tekort T", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "g" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "rounded-tr-md px-3 py-3 text-right text-xs font-medium",
									children: "Dekking"
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "align-middle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border py-2 pr-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											value: row.name,
											onChange: (name) => updateHousing(row.id, { name }),
											ariaLabel: "Naam woninggroep",
											className: "min-w-44"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon-sm",
											className: "size-10 shrink-0 text-subtle",
											"aria-label": `Verwijder ${row.name}`,
											onClick: () => removeHousing(row.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
										value: row.demand,
										onChange: (demand) => updateHousing(row.id, { demand }),
										ariaLabel: `Behoefte ${row.name}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
										value: row.available,
										onChange: (available) => updateHousing(row.id, { available }),
										ariaLabel: `Beschikbaar ${row.name}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
										value: row.quality,
										onChange: (quality) => updateHousing(row.id, { quality }),
										ariaLabel: `Kwaliteit ${row.name}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
										value: row.affordable,
										onChange: (affordable) => updateHousing(row.id, { affordable }),
										ariaLabel: `Betaalbaar ${row.name}`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcCell, { children: formatInt(row.matched) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcCell, { children: formatInt(row.shortfall) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "border-b border-border px-1 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcCell, {
										className: cn(row.coverage === lowest && rows.length > 1 && "text-danger"),
										children: formatPct(row.coverage)
									})
								})
							]
						}, row.id)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-left text-sm font-medium",
								children: "Totaal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatInt(totals.demand)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatInt(totals.available)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatInt(totals.quality)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatInt(totals.affordable)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatInt(totals.matched)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatInt(totals.shortfall)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-3 text-right text-sm font-medium tabular-nums",
								children: formatPct(totals.housingCoverage)
							})
						] }) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 rounded-md bg-bg px-4 py-3 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tracking-wide text-subtle uppercase",
						children: "Formule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block font-medium text-fg",
						children: [
							"AW = 100 × Σ M",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "g" }),
							" / Σ D",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "g" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block",
						children: [
							"Gekoppeld M",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "g" }),
							" is het kleinste van behoefte, beschikbaar, kwaliteit en betaalbaar. Zo telt een woning nooit dubbel en nooit voorbij de toets."
						]
					})
				]
			})
		]
	});
}
function IncomeSheet() {
	const households = useModelStore((state) => state.households);
	const scenarios = useModelStore((state) => state.scenarios);
	const activeScenarioId = useModelStore((state) => state.activeScenarioId);
	const updateHousehold = useModelStore((state) => state.updateHousehold);
	const addHousehold = useModelStore((state) => state.addHousehold);
	const removeHousehold = useModelStore((state) => state.removeHousehold);
	const scenario = scenarios.find((item) => item.id === activeScenarioId) ?? scenarios[0];
	const rows = households.map((row) => computeHousehold(row, scenario.adult, scenario.child));
	const totalWeight = rows.reduce((sum, row) => sum + row.weight, 0);
	const incomeCoverage = totalWeight > 0 ? rows.reduce((sum, row) => sum + row.weight * (row.sufficient ? 1 : 0), 0) / totalWeight : 0;
	const gapMass = rows.reduce((sum, row) => sum + row.weight * row.gap, 0);
	const shortWeight = rows.reduce((sum, row) => sum + (row.sufficient ? 0 : row.weight), 0);
	const avgGapIfShort = shortWeight > 0 ? gapMass / shortWeight : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "basisinkomen",
		className: "scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-subtle uppercase",
						children: "Rekenblad 2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-medium tracking-tight text-fg",
						children: "Toereikend basisinkomen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 max-w-2xl text-sm leading-normal text-muted",
						children: [
							"De toets kijkt naar wat een huishouden na adequate woon- en energielasten werkelijk overhoudt voor andere noodzakelijke uitgaven. Scenario: ",
							scenario.name,
							"."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: addHousehold,
					className: "h-11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Huishoudtype toevoegen"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[68rem] border-separate border-spacing-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-primary text-primary-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "rounded-tl-md px-3 py-3 text-left text-xs font-medium",
								children: "Huishoudtype"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: "Volw."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: "Kind."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: ["Weging w", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: ["Overig netto Y", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: ["Wonen + energie H", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: ["Overig minimum N", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-center text-xs font-medium",
								children: "Adequate woning"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: ["Basisinkomen U", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: ["Saldo R", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-3 text-right text-xs font-medium",
								children: "Tekort"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "rounded-tr-md px-3 py-3 text-center text-xs font-medium",
								children: "Toereikend"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border py-2 pr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									value: row.name,
									onChange: (name) => updateHousehold(row.id, { name }),
									ariaLabel: "Naam huishoudtype",
									className: "min-w-44"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon-sm",
									className: "size-10 shrink-0 text-subtle",
									"aria-label": `Verwijder ${row.name}`,
									onClick: () => removeHousehold(row.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: row.adults,
								onChange: (adults) => updateHousehold(row.id, { adults }),
								ariaLabel: `Volwassenen ${row.name}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: row.children,
								onChange: (children) => updateHousehold(row.id, { children }),
								ariaLabel: `Kinderen ${row.name}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: row.weight,
								onChange: (weight) => updateHousehold(row.id, { weight }),
								ariaLabel: `Weging ${row.name}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: row.otherIncome,
								onChange: (otherIncome) => updateHousehold(row.id, { otherIncome }),
								ariaLabel: `Inkomen ${row.name}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: row.housingEnergy,
								onChange: (housingEnergy) => updateHousehold(row.id, { housingEnergy }),
								ariaLabel: `Woonlasten ${row.name}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
								value: row.otherMin,
								onChange: (otherMin) => updateHousehold(row.id, { otherMin }),
								ariaLabel: `Minimum ${row.name}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "flex h-10 items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: row.adequateHome,
									onChange: (event) => updateHousehold(row.id, { adequateHome: event.target.checked }),
									"aria-label": `Adequate woning ${row.name}`,
									className: "size-5 accent-primary"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcCell, { children: formatEuroMonth(row.basicIncome) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcCell, {
								className: cn(row.saldo < 0 && "text-danger"),
								children: formatEuroMonth(row.saldo)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalcCell, {
								className: cn(row.gap > 0 && "text-danger"),
								children: row.gap > 0 ? formatEuroMonth(row.gap) : "—"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "border-b border-border px-1 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 items-center justify-center",
								children: row.sufficient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-4 text-ok",
									"aria-label": "Toereikend"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
									className: "size-4 text-danger",
									"aria-label": "Niet toereikend"
								})
							})
						})
					] }, row.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-md bg-bg px-4 py-3 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium tracking-wide text-subtle uppercase",
						children: "Huishouden"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block font-medium text-fg",
						children: [
							"U",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
							" = a",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
							" × b + k",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
							" × c"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-md bg-bg px-4 py-3 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium tracking-wide text-subtle uppercase",
							children: "Toereikendheid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block font-medium text-fg",
							children: [
								"R",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
								" = Y",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
								" + U",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
								" − H",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" }),
								" − N",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "h" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block",
							children: [
								"Dekking ",
								formatPct(incomeCoverage),
								" · weging ",
								formatInt(totalWeight),
								" · gemiddeld tekort indien ontoereikend ",
								formatEuroMonth(avgGapIfShort)
							]
						})
					]
				})]
			})
		]
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	ref,
	className: cn("fixed inset-0 z-50 bg-overlay", "data-[state=open]:animate-in data-[state=open]:fade-in-0", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className),
	...props
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-surface p-6 shadow-lift", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight text-fg", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm leading-normal text-muted", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants({ variant: "danger" }), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "ghost" }), className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (useModelStore.persist.hasHydrated()) {
			setHydrated(true);
			return;
		}
		const unsub = useModelStore.persist.onFinishHydration(() => setHydrated(true));
		useModelStore.persist.rehydrate();
		return unsub;
	}, []);
	return hydrated;
}
function useLiveTotals() {
	const housing = useModelStore((state) => state.housing);
	const households = useModelStore((state) => state.households);
	const finance = useModelStore((state) => state.finance);
	const scenarios = useModelStore((state) => state.scenarios);
	const activeScenarioId = useModelStore((state) => state.activeScenarioId);
	return (0, import_react.useMemo)(() => computeTotals(useModelStore.getState()), [
		housing,
		households,
		finance,
		scenarios,
		activeScenarioId
	]);
}
var NAV = [
	{
		href: "#overzicht",
		label: "Overzicht"
	},
	{
		href: "#woningvoorraad",
		label: "Woningvoorraad"
	},
	{
		href: "#basisinkomen",
		label: "Basisinkomen"
	},
	{
		href: "#financiering",
		label: "Financiering"
	},
	{
		href: "#methode",
		label: "Methode"
	}
];
function Calculator() {
	const hydrated = useHydrated();
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	const totals = useLiveTotals();
	const area = useModelStore((state) => state.area);
	const asOf = useModelStore((state) => state.asOf);
	const priceLevel = useModelStore((state) => state.priceLevel);
	const targetCoverage = useModelStore((state) => state.targetCoverage);
	const scenarios = useModelStore((state) => state.scenarios);
	const activeScenarioId = useModelStore((state) => state.activeScenarioId);
	const finance = useModelStore((state) => state.finance);
	const households = useModelStore((state) => state.households);
	const setMeta = useModelStore((state) => state.setMeta);
	const setScenario = useModelStore((state) => state.setScenario);
	const updateScenario = useModelStore((state) => state.updateScenario);
	const updateFinance = useModelStore((state) => state.updateFinance);
	const reset = useModelStore((state) => state.reset);
	const comparison = (0, import_react.useMemo)(() => computeScenarioResults(useModelStore.getState()), [
		scenarios,
		finance,
		households
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-xl bg-surface shadow-card" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#overzicht",
							className: "font-display text-lg font-medium tracking-tight text-fg",
							children: "Rekenmethode 0.1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-1 flex-wrap gap-1 text-sm",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.href,
								className: "rounded-md px-3 py-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-fg",
								children: item.label
							}, item.href))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							className: "h-10",
							onClick: () => setResetOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Voorbeeld"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "overzicht",
						className: "scroll-mt-24 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-subtle uppercase",
								children: "Versie 0.1 · 11 september 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl",
								children: [
									"Adequate woningvoorraad",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "italic",
										children: "én"
									}),
									" basisinkomen"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-base leading-normal text-muted",
								children: "Deze rekenmethode maakt zichtbaar hoeveel huishoudens beschikken over een passende woning, een toereikend inkomen en de combinatie van beide."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "rounded-xl bg-surface p-5 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-subtle uppercase",
								children: "Afbakening"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "Gebied"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										value: area,
										onChange: (value) => setMeta({ area: value }),
										ariaLabel: "Gebied"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Peildatum"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											value: asOf,
											onChange: (value) => setMeta({ asOf: value }),
											ariaLabel: "Peildatum"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Prijspeil"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
											value: priceLevel,
											onChange: (value) => setMeta({ priceLevel: value }),
											ariaLabel: "Prijspeil"
										})]
									})]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-border bg-surface px-4 py-3 text-sm text-muted",
						children: "Cijfers zijn illustratieve voorbeeldgegevens. Ze vervangen de werkelijkheid niet en zijn geen oordeel over Nederland."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 shadow-card sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-medium tracking-tight",
									children: "De bestaansbasis in één oogopslag"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"Scenario ",
										totals.scenarioName,
										" · doel ",
										formatPct(targetCoverage)
									]
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
										label: "Adequate woningtoewijzing",
										value: formatPct(totals.housingCoverage),
										hint: `${formatInt(totals.shortfall)} woningen tekort`,
										met: totals.housingCoverage >= targetCoverage
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
										label: "Toereikend inkomen",
										value: formatPct(totals.incomeCoverage),
										hint: `Gemiddeld tekort ${formatEuro(totals.avgGapIfShort)}`,
										met: totals.incomeCoverage >= targetCoverage
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
										label: "Gezamenlijke bestaansbasis",
										value: formatPct(totals.jointCoverage),
										hint: "Adequate woning én toereikend inkomen",
										met: totals.jointCoverage >= targetCoverage
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
										label: "Netto publieke kosten",
										value: formatEuro(totals.netCost),
										hint: `Bruto ${formatEuro(totals.grossCost)} per jaar`,
										met: false,
										neutral: true
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted",
								children: [
									"Laagste groepsdekking: ",
									totals.lowestGroupName,
									" · ",
									formatPct(totals.lowestGroupCoverage),
									". Lees de totaalscore altijd samen met de zwakste groep."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 shadow-card sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Kies een scenario"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Het basisinkomen is een instrument, geen vast wetenschappelijk bedrag. Vergelijk minstens drie varianten."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
								children: scenarios.map((scenario) => {
									const active = scenario.id === activeScenarioId;
									const row = comparison.find((item) => item.id === scenario.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setScenario(scenario.id),
										className: cn("rounded-lg p-4 text-left shadow-card transition-[box-shadow,transform] duration-150 ease-[var(--ease-out)]", active ? "bg-primary text-primary-fg" : "bg-bg hover:shadow-card-hover"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-medium",
												children: scenario.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-1 block text-lg font-medium tabular-nums",
												children: [
													formatEuro(scenario.adult),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("text-sm", active ? "text-primary-fg/70" : "text-muted"),
														children: "volw."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: cn("mt-2 block text-sm tabular-nums", active ? "text-primary-fg/80" : "text-muted"),
												children: [row ? formatPct(row.incomeCoverage) : "—", " toereikend"]
											})
										]
									}, scenario.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Bedrag volwassene per maand"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: totals.adult,
											onChange: (adult) => updateScenario(activeScenarioId, { adult }),
											ariaLabel: "Basisinkomen volwassene"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Bedrag kind per maand"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: totals.child,
											onChange: (child) => updateScenario(activeScenarioId, { child }),
											ariaLabel: "Basisinkomen kind"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Doeldekking"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: Math.round(targetCoverage * 100),
											onChange: (value) => setMeta({ targetCoverage: Math.min(100, value) / 100 }),
											ariaLabel: "Doeldekking in procent",
											max: 100
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HousingSheet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncomeSheet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "financiering",
						className: "scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Bruto en netto publieke kosten"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 max-w-2xl text-sm text-muted",
								children: [
									"De netto kosten zijn een boekhoudkundige uitkomst, geen voorspelling van gedragseffecten. C",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "bruto" }),
									" = 12 × (b × N",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "a" }),
									" + c × N",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "k" }),
									")."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Volwassen ontvangers"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: finance.adultRecipients,
											onChange: (adultRecipients) => updateFinance({ adultRecipients }),
											ariaLabel: "Volwassen ontvangers"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Kindontvangers"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: finance.childRecipients,
											onChange: (childRecipients) => updateFinance({ childRecipients }),
											ariaLabel: "Kindontvangers"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Uitvoering per jaar"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: finance.adminCost,
											onChange: (adminCost) => updateFinance({ adminCost }),
											ariaLabel: "Uitvoeringskosten"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Extra belastingopbrengst"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: finance.extraTax,
											onChange: (extraTax) => updateFinance({ extraTax }),
											ariaLabel: "Extra belasting"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "Besparing vervallen regelingen"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
											value: finance.savings,
											onChange: (savings) => updateFinance({ savings }),
											ariaLabel: "Besparing"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-5 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-sm text-muted",
										children: "Bruto uitgaven per jaar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium tabular-nums text-fg",
										children: formatEuro(totals.grossCost)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-sm text-muted",
										children: "Netto publieke kosten"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium tabular-nums text-fg",
										children: formatEuro(totals.netCost)
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 shadow-card sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Scenario’s naast elkaar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Dezelfde huishoudens, andere bedragen. De keuze voor de gewenste dekking is politiek."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[40rem] text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-border text-left text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 font-medium",
												children: "Scenario"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right font-medium",
												children: "Volwassene"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right font-medium",
												children: "Kind"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right font-medium",
												children: "Inkomensdekking"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right font-medium",
												children: "Bestaansbasis"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 text-right font-medium",
												children: "Netto kosten"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: comparison.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: cn("border-b border-border", row.id === activeScenarioId && "bg-bg"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 font-medium",
												children: row.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-right tabular-nums",
												children: formatEuro(row.adult)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-right tabular-nums",
												children: formatEuro(row.child)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-right tabular-nums",
												children: formatPct(row.incomeCoverage)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-right tabular-nums",
												children: formatPct(row.jointCoverage)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2.5 text-right tabular-nums",
												children: formatEuro(row.netCost)
											})
										]
									}, row.id)) })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "methode",
						className: "scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Wat moet verder verzameld?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									[
										"01",
										"Afbakening",
										"Gebied, populatie, peildatum en prijspeil vastleggen."
									],
									[
										"02",
										"Woningvraag",
										"Huishoudens naar regio, type en bijzondere behoefte."
									],
									[
										"03",
										"Passend aanbod",
										"Alleen woningen die beschikbaar, geschikt en betaalbaar zijn."
									],
									[
										"04",
										"Minimumbudget",
										"Niet-woongebonden noodzakelijke uitgaven per huishoudtype."
									],
									[
										"05",
										"Financiering",
										"Ontvangers, uitvoering, belastingterugvloeiing en besparingen."
									],
									[
										"06",
										"Bronkwaliteit",
										"Meetjaar, bron en of een cel feit, schatting of norm is."
									]
								].map(([nr, title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-lg bg-bg p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium tracking-wide text-subtle",
											children: nr
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-medium text-fg",
											children: title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted",
											children: text
										})
									]
								}, nr))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-md bg-bg px-4 py-4 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-fg",
									children: "Gebruiksregels"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 list-disc space-y-1 pl-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Groepen zijn exclusief: een woning en een huishouden tellen één keer." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Onbekend is niet hetzelfde als nul. Laat ontbrekende data leeg en noteer waarom." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Een gemiddelde kan uitsluiting verbergen; toon altijd de laagste groepsdekking." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gedragsreacties (werk, huur, migratie) vallen buiten versie 0.1." })
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl bg-surface p-4 shadow-card sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "Download versie 0.1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Officiële methodenbeschrijving en het invulbare rekenmodel. De webapp bewaart uw wijzigingen op dit apparaat."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "/downloads/rekenmethode-v0.1.docx",
										download: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Methodenbeschrijving"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "/downloads/rekenmodel-v0.1.xlsx",
										download: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Rekenmodel Excel"]
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "pb-8 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Initiatief en denklijn: ir. Kleo Rem. Status: eerste openbare werkversie voor toetsing." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: "Bronnen o.a. OHCHR adequate housing, Eurostat, CBS Woonbase, WoON, BAG, EP-Online, Nibud."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: resetOpen,
				onOpenChange: setResetOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Voorbeeldgegevens herstellen?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Uw huidige invoer wordt vervangen door de illustratieve dataset van versie 0.1." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Annuleren" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						reset();
						setResetOpen(false);
					},
					children: "Herstellen"
				})] })] })
			})
		]
	});
}
function Kpi({ label, value, hint, met, neutral }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg bg-bg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl font-medium tracking-tight tabular-nums text-fg",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: hint
			}),
			neutral ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-xs font-medium", met ? "text-ok" : "text-danger"),
				children: met ? "Op of boven de doeldekking" : "Onder de doeldekking"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {});
}
//#endregion
export { Home as component };
