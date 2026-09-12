import { Check, Plus, Trash2, X } from "lucide-react";
import { CalcCell, NumberField, TextField } from "@/components/model/fields";
import { Button } from "@/components/ui/button";
import { formatEuroMonth, formatInt, formatPct } from "@/lib/model/format";
import { computeHousehold } from "@/lib/model/formulas";
import { useModelStore } from "@/lib/model/store";
import { cn } from "@/lib/utils";

export function IncomeSheet() {
  const households = useModelStore((state) => state.households);
  const scenarios = useModelStore((state) => state.scenarios);
  const activeScenarioId = useModelStore((state) => state.activeScenarioId);
  const updateHousehold = useModelStore((state) => state.updateHousehold);
  const addHousehold = useModelStore((state) => state.addHousehold);
  const removeHousehold = useModelStore((state) => state.removeHousehold);
  const scenario =
    scenarios.find((item) => item.id === activeScenarioId) ?? scenarios[0];
  const rows = households.map((row) =>
    computeHousehold(row, scenario.adult, scenario.child),
  );
  const totalWeight = rows.reduce((sum, row) => sum + row.weight, 0);
  const incomeCoverage =
    totalWeight > 0
      ? rows.reduce((sum, row) => sum + row.weight * (row.sufficient ? 1 : 0), 0) /
        totalWeight
      : 0;
  const gapMass = rows.reduce((sum, row) => sum + row.weight * row.gap, 0);
  const shortWeight = rows.reduce(
    (sum, row) => sum + (row.sufficient ? 0 : row.weight),
    0,
  );
  const avgGapIfShort = shortWeight > 0 ? gapMass / shortWeight : 0;

  return (
    <section id="basisinkomen" className="scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-subtle uppercase">Rekenblad 2</p>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">
            Toereikend basisinkomen
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-normal text-muted">
            De toets kijkt naar wat een huishouden na adequate woon- en energielasten werkelijk
            overhoudt voor andere noodzakelijke uitgaven. Scenario: {scenario.name}.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addHousehold} className="h-11">
          <Plus className="size-4" />
          Huishoudtype toevoegen
        </Button>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[68rem] border-separate border-spacing-0">
          <thead>
            <tr className="bg-primary text-primary-fg">
              <th className="rounded-tl-md px-3 py-3 text-left text-xs font-medium">Huishoudtype</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Volw.</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Kind.</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Weging w<sub>h</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Overig netto Y<sub>h</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Wonen + energie H<sub>h</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Overig minimum N<sub>h</sub></th>
              <th className="px-3 py-3 text-center text-xs font-medium">Adequate woning</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Basisinkomen U<sub>h</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Saldo R<sub>h</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Tekort</th>
              <th className="rounded-tr-md px-3 py-3 text-center text-xs font-medium">Toereikend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border-b border-border py-2 pr-2">
                  <div className="flex items-center gap-1">
                    <TextField
                      value={row.name}
                      onChange={(name) => updateHousehold(row.id, { name })}
                      ariaLabel="Naam huishoudtype"
                      className="min-w-44"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="size-10 shrink-0 text-subtle"
                      aria-label={`Verwijder ${row.name}`}
                      onClick={() => removeHousehold(row.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.adults}
                    onChange={(adults) => updateHousehold(row.id, { adults })}
                    ariaLabel={`Volwassenen ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.children}
                    onChange={(children) => updateHousehold(row.id, { children })}
                    ariaLabel={`Kinderen ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.weight}
                    onChange={(weight) => updateHousehold(row.id, { weight })}
                    ariaLabel={`Weging ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.otherIncome}
                    onChange={(otherIncome) => updateHousehold(row.id, { otherIncome })}
                    ariaLabel={`Inkomen ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.housingEnergy}
                    onChange={(housingEnergy) => updateHousehold(row.id, { housingEnergy })}
                    ariaLabel={`Woonlasten ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.otherMin}
                    onChange={(otherMin) => updateHousehold(row.id, { otherMin })}
                    ariaLabel={`Minimum ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <label className="flex h-10 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={row.adequateHome}
                      onChange={(event) =>
                        updateHousehold(row.id, { adequateHome: event.target.checked })
                      }
                      aria-label={`Adequate woning ${row.name}`}
                      className="size-5 accent-primary"
                    />
                  </label>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <CalcCell>{formatEuroMonth(row.basicIncome)}</CalcCell>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <CalcCell className={cn(row.saldo < 0 && "text-danger")}>
                    {formatEuroMonth(row.saldo)}
                  </CalcCell>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <CalcCell className={cn(row.gap > 0 && "text-danger")}>
                    {row.gap > 0 ? formatEuroMonth(row.gap) : "—"}
                  </CalcCell>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <div className="flex h-10 items-center justify-center">
                    {row.sufficient ? (
                      <Check className="size-4 text-ok" aria-label="Toereikend" />
                    ) : (
                      <X className="size-4 text-danger" aria-label="Niet toereikend" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <p className="rounded-md bg-bg px-4 py-3 text-sm text-muted">
          <span className="font-medium tracking-wide text-subtle uppercase">Huishouden</span>
          <span className="mt-1 block font-medium text-fg">
            U<sub>h</sub> = a<sub>h</sub> × b + k<sub>h</sub> × c
          </span>
        </p>
        <p className="rounded-md bg-bg px-4 py-3 text-sm text-muted">
          <span className="font-medium tracking-wide text-subtle uppercase">Toereikendheid</span>
          <span className="mt-1 block font-medium text-fg">
            R<sub>h</sub> = Y<sub>h</sub> + U<sub>h</sub> − H<sub>h</sub> − N<sub>h</sub>
          </span>
          <span className="mt-1 block">
            Dekking {formatPct(incomeCoverage)} · weging {formatInt(totalWeight)} ·
            gemiddeld tekort indien ontoereikend {formatEuroMonth(avgGapIfShort)}
          </span>
        </p>
      </div>
    </section>
  );
}
