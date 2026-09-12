import {
  Download,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { HousingSheet } from "@/components/model/housing-sheet";
import { IncomeSheet } from "@/components/model/income-sheet";
import { NumberField, TextField } from "@/components/model/fields";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { formatEuro, formatInt, formatPct } from "@/lib/model/format";
import {
  computeScenarioResults,
  computeTotals,
} from "@/lib/model/formulas";
import { useModelStore } from "@/lib/model/store";
import { cn } from "@/lib/utils";

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (useModelStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useModelStore.persist.onFinishHydration(() => setHydrated(true));
    void useModelStore.persist.rehydrate();
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
  return useMemo(
    () => computeTotals(useModelStore.getState()),
    [housing, households, finance, scenarios, activeScenarioId],
  );
}

const NAV = [
  { href: "#overzicht", label: "Overzicht" },
  { href: "#woningvoorraad", label: "Woningvoorraad" },
  { href: "#basisinkomen", label: "Basisinkomen" },
  { href: "#financiering", label: "Financiering" },
  { href: "#methode", label: "Methode" },
];

export function Calculator() {
  const hydrated = useHydrated();
  const [resetOpen, setResetOpen] = useState(false);
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
  const comparison = useMemo(
    () => computeScenarioResults(useModelStore.getState()),
    [scenarios, finance, households],
  );

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="h-40 rounded-xl bg-surface shadow-card" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <a href="#overzicht" className="font-display text-lg font-medium tracking-tight text-fg">
            Rekenmethode 0.1
          </a>
          <nav className="flex flex-1 flex-wrap gap-1 text-sm">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-muted transition-colors duration-150 hover:bg-surface hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button type="button" variant="ghost" size="sm" className="h-10" onClick={() => setResetOpen(true)}>
            <RotateCcw className="size-3.5" />
            Voorbeeld
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <section id="overzicht" className="scroll-mt-24 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">Versie 0.1 · 11 september 2026</p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
              Adequate woningvoorraad{" "}
              <em className="italic">én</em> basisinkomen
            </h1>
            <p className="mt-4 max-w-xl text-base leading-normal text-muted">
              Deze rekenmethode maakt zichtbaar hoeveel huishoudens beschikken over een passende
              woning, een toereikend inkomen en de combinatie van beide.
            </p>
          </div>
          <aside className="rounded-xl bg-surface p-5 shadow-card">
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">Afbakening</p>
            <div className="mt-3 grid gap-3">
              <label className="grid gap-1 text-sm">
                <span className="text-muted">Gebied</span>
                <TextField value={area} onChange={(value) => setMeta({ area: value })} ariaLabel="Gebied" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Peildatum</span>
                  <TextField value={asOf} onChange={(value) => setMeta({ asOf: value })} ariaLabel="Peildatum" />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Prijspeil</span>
                  <TextField
                    value={priceLevel}
                    onChange={(value) => setMeta({ priceLevel: value })}
                    ariaLabel="Prijspeil"
                  />
                </label>
              </div>
            </div>
          </aside>
        </section>

        <p className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-muted">
          Cijfers zijn illustratieve voorbeeldgegevens. Ze vervangen de werkelijkheid niet en zijn
          geen oordeel over Nederland.
        </p>

        <section className="rounded-xl bg-surface p-4 shadow-card sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-medium tracking-tight">
                De bestaansbasis in één oogopslag
              </h2>
              <p className="text-sm text-muted">
                Scenario {totals.scenarioName} · doel {formatPct(targetCoverage)}
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi
              label="Adequate woningtoewijzing"
              value={formatPct(totals.housingCoverage)}
              hint={`${formatInt(totals.shortfall)} woningen tekort`}
              met={totals.housingCoverage >= targetCoverage}
            />
            <Kpi
              label="Toereikend inkomen"
              value={formatPct(totals.incomeCoverage)}
              hint={`Gemiddeld tekort ${formatEuro(totals.avgGapIfShort)}`}
              met={totals.incomeCoverage >= targetCoverage}
            />
            <Kpi
              label="Gezamenlijke bestaansbasis"
              value={formatPct(totals.jointCoverage)}
              hint="Adequate woning én toereikend inkomen"
              met={totals.jointCoverage >= targetCoverage}
            />
            <Kpi
              label="Netto publieke kosten"
              value={formatEuro(totals.netCost)}
              hint={`Bruto ${formatEuro(totals.grossCost)} per jaar`}
              met={false}
              neutral
            />
          </div>
          <p className="mt-4 text-sm text-muted">
            Laagste groepsdekking: {totals.lowestGroupName} · {formatPct(totals.lowestGroupCoverage)}.
            Lees de totaalscore altijd samen met de zwakste groep.
          </p>
        </section>

        <section className="rounded-xl bg-surface p-4 shadow-card sm:p-6">
          <h2 className="font-display text-2xl font-medium tracking-tight">Kies een scenario</h2>
          <p className="mt-1 text-sm text-muted">
            Het basisinkomen is een instrument, geen vast wetenschappelijk bedrag. Vergelijk
            minstens drie varianten.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {scenarios.map((scenario) => {
              const active = scenario.id === activeScenarioId;
              const row = comparison.find((item) => item.id === scenario.id);
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setScenario(scenario.id)}
                  className={cn(
                    "rounded-lg p-4 text-left shadow-card transition-[box-shadow,transform] duration-150 ease-[var(--ease-out)]",
                    active ? "bg-primary text-primary-fg" : "bg-bg hover:shadow-card-hover",
                  )}
                >
                  <span className="block text-sm font-medium">{scenario.name}</span>
                  <span className="mt-1 block text-lg font-medium tabular-nums">
                    {formatEuro(scenario.adult)}{" "}
                    <span className={cn("text-sm", active ? "text-primary-fg/70" : "text-muted")}>
                      volw.
                    </span>
                  </span>
                  <span className={cn("mt-2 block text-sm tabular-nums", active ? "text-primary-fg/80" : "text-muted")}>
                    {row ? formatPct(row.incomeCoverage) : "—"} toereikend
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Bedrag volwassene per maand</span>
              <NumberField
                value={totals.adult}
                onChange={(adult) => updateScenario(activeScenarioId, { adult })}
                ariaLabel="Basisinkomen volwassene"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Bedrag kind per maand</span>
              <NumberField
                value={totals.child}
                onChange={(child) => updateScenario(activeScenarioId, { child })}
                ariaLabel="Basisinkomen kind"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Doeldekking</span>
              <NumberField
                value={Math.round(targetCoverage * 100)}
                onChange={(value) => setMeta({ targetCoverage: Math.min(100, value) / 100 })}
                ariaLabel="Doeldekking in procent"
                max={100}
              />
            </label>
          </div>
        </section>

        <HousingSheet />
        <IncomeSheet />

        <section id="financiering" className="scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6">
          <h2 className="font-display text-2xl font-medium tracking-tight">Bruto en netto publieke kosten</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            De netto kosten zijn een boekhoudkundige uitkomst, geen voorspelling van gedragseffecten.
            C<sub>bruto</sub> = 12 × (b × N<sub>a</sub> + c × N<sub>k</sub>).
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Volwassen ontvangers</span>
              <NumberField
                value={finance.adultRecipients}
                onChange={(adultRecipients) => updateFinance({ adultRecipients })}
                ariaLabel="Volwassen ontvangers"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Kindontvangers</span>
              <NumberField
                value={finance.childRecipients}
                onChange={(childRecipients) => updateFinance({ childRecipients })}
                ariaLabel="Kindontvangers"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Uitvoering per jaar</span>
              <NumberField
                value={finance.adminCost}
                onChange={(adminCost) => updateFinance({ adminCost })}
                ariaLabel="Uitvoeringskosten"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Extra belastingopbrengst</span>
              <NumberField
                value={finance.extraTax}
                onChange={(extraTax) => updateFinance({ extraTax })}
                ariaLabel="Extra belasting"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Besparing vervallen regelingen</span>
              <NumberField
                value={finance.savings}
                onChange={(savings) => updateFinance({ savings })}
                ariaLabel="Besparing"
              />
            </label>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-bg px-4 py-3">
              <dt className="text-sm text-muted">Bruto uitgaven per jaar</dt>
              <dd className="font-medium tabular-nums text-fg">{formatEuro(totals.grossCost)}</dd>
            </div>
            <div className="rounded-md bg-bg px-4 py-3">
              <dt className="text-sm text-muted">Netto publieke kosten</dt>
              <dd className="font-medium tabular-nums text-fg">{formatEuro(totals.netCost)}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl bg-surface p-4 shadow-card sm:p-6">
          <h2 className="font-display text-2xl font-medium tracking-tight">Scenario’s naast elkaar</h2>
          <p className="mt-1 text-sm text-muted">
            Dezelfde huishoudens, andere bedragen. De keuze voor de gewenste dekking is politiek.
          </p>
          <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="py-2 font-medium">Scenario</th>
                  <th className="py-2 text-right font-medium">Volwassene</th>
                  <th className="py-2 text-right font-medium">Kind</th>
                  <th className="py-2 text-right font-medium">Inkomensdekking</th>
                  <th className="py-2 text-right font-medium">Bestaansbasis</th>
                  <th className="py-2 text-right font-medium">Netto kosten</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b border-border",
                      row.id === activeScenarioId && "bg-bg",
                    )}
                  >
                    <td className="py-2.5 font-medium">{row.name}</td>
                    <td className="py-2.5 text-right tabular-nums">{formatEuro(row.adult)}</td>
                    <td className="py-2.5 text-right tabular-nums">{formatEuro(row.child)}</td>
                    <td className="py-2.5 text-right tabular-nums">{formatPct(row.incomeCoverage)}</td>
                    <td className="py-2.5 text-right tabular-nums">{formatPct(row.jointCoverage)}</td>
                    <td className="py-2.5 text-right tabular-nums">{formatEuro(row.netCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="methode" className="scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6">
          <h2 className="font-display text-2xl font-medium tracking-tight">Wat moet verder verzameld?</h2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Afbakening", "Gebied, populatie, peildatum en prijspeil vastleggen."],
              ["02", "Woningvraag", "Huishoudens naar regio, type en bijzondere behoefte."],
              ["03", "Passend aanbod", "Alleen woningen die beschikbaar, geschikt en betaalbaar zijn."],
              ["04", "Minimumbudget", "Niet-woongebonden noodzakelijke uitgaven per huishoudtype."],
              ["05", "Financiering", "Ontvangers, uitvoering, belastingterugvloeiing en besparingen."],
              ["06", "Bronkwaliteit", "Meetjaar, bron en of een cel feit, schatting of norm is."],
            ].map(([nr, title, text]) => (
              <li key={nr} className="rounded-lg bg-bg p-4">
                <p className="text-xs font-medium tracking-wide text-subtle">{nr}</p>
                <p className="mt-1 font-medium text-fg">{title}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-md bg-bg px-4 py-4 text-sm text-muted">
            <p className="font-medium text-fg">Gebruiksregels</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Groepen zijn exclusief: een woning en een huishouden tellen één keer.</li>
              <li>Onbekend is niet hetzelfde als nul. Laat ontbrekende data leeg en noteer waarom.</li>
              <li>Een gemiddelde kan uitsluiting verbergen; toon altijd de laagste groepsdekking.</li>
              <li>Gedragsreacties (werk, huur, migratie) vallen buiten versie 0.1.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-xl bg-surface p-4 shadow-card sm:p-6">
          <h2 className="font-display text-2xl font-medium tracking-tight">Download versie 0.1</h2>
          <p className="mt-1 text-sm text-muted">
            Officiële methodenbeschrijving en het invulbare rekenmodel. De webapp bewaart uw
            wijzigingen op dit apparaat.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href="/downloads/rekenmethode-v0.1.docx" download>
                <Download className="size-4" />
                Methodenbeschrijving
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/downloads/rekenmodel-v0.1.xlsx" download>
                <Download className="size-4" />
                Rekenmodel Excel
              </a>
            </Button>
          </div>
        </section>

        <footer className="pb-8 text-sm text-muted">
          <p>Initiatief en denklijn: ir. Kleo Rem. Status: eerste openbare werkversie voor toetsing.</p>
          <p className="mt-1">
            Bronnen o.a. OHCHR adequate housing, Eurostat, CBS Woonbase, WoON, BAG, EP-Online, Nibud.
          </p>
        </footer>
      </main>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voorbeeldgegevens herstellen?</AlertDialogTitle>
            <AlertDialogDescription>
              Uw huidige invoer wordt vervangen door de illustratieve dataset van versie 0.1.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                reset();
                setResetOpen(false);
              }}
            >
              Herstellen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  met,
  neutral,
}: {
  label: string;
  value: string;
  hint: string;
  met: boolean;
  neutral?: boolean;
}) {
  return (
    <article className="rounded-lg bg-bg p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-medium tracking-tight tabular-nums text-fg">
        {value}
      </p>
      <p className="mt-2 text-xs text-muted">{hint}</p>
      {neutral ? null : (
        <p className={cn("mt-2 text-xs font-medium", met ? "text-ok" : "text-danger")}>
          {met ? "Op of boven de doeldekking" : "Onder de doeldekking"}
        </p>
      )}
    </article>
  );
}
