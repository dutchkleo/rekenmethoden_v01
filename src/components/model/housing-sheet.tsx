import { Plus, Trash2 } from "lucide-react";
import { CalcCell, NumberField, TextField } from "@/components/model/fields";
import { Button } from "@/components/ui/button";
import { formatInt, formatPct } from "@/lib/model/format";
import { computeHousing } from "@/lib/model/formulas";
import { useModelStore } from "@/lib/model/store";
import { cn } from "@/lib/utils";

export function HousingSheet() {
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
    housingCoverage:
      rows.reduce((sum, row) => sum + row.demand, 0) > 0
        ? rows.reduce((sum, row) => sum + row.matched, 0) /
          rows.reduce((sum, row) => sum + row.demand, 0)
        : 0,
  };
  const lowest = rows.reduce(
    (min, row) => Math.min(min, row.coverage),
    rows[0]?.coverage ?? 0,
  );

  return (
    <section id="woningvoorraad" className="scroll-mt-24 rounded-xl bg-surface p-4 shadow-card sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-subtle uppercase">Rekenblad 1</p>
          <h2 className="font-display text-2xl font-medium tracking-tight text-fg">
            Adequate woningvoorraad
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-normal text-muted">
            Een woning telt pas mee wanneer zij werkelijk beschikbaar, geschikt, betaalbaar en
            adequaat van kwaliteit, locatie en woonzekerheid is.
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addHousing} className="h-11">
          <Plus className="size-4" />
          Woninggroep toevoegen
        </Button>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[52rem] border-separate border-spacing-0">
          <thead>
            <tr className="bg-primary text-primary-fg">
              <th className="rounded-tl-md px-3 py-3 text-left text-xs font-medium">Woninggroep</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Behoefte D<sub>g</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Beschikbaar</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Kwaliteit, locatie, zekerheid</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Betaalbaar en adequaat</th>
              <th className="px-3 py-3 text-right text-xs font-medium">Gekoppeld M<sub>g</sub></th>
              <th className="px-3 py-3 text-right text-xs font-medium">Tekort T<sub>g</sub></th>
              <th className="rounded-tr-md px-3 py-3 text-right text-xs font-medium">Dekking</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="align-middle">
                <td className="border-b border-border py-2 pr-2">
                  <div className="flex items-center gap-1">
                    <TextField
                      value={row.name}
                      onChange={(name) => updateHousing(row.id, { name })}
                      ariaLabel="Naam woninggroep"
                      className="min-w-44"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="size-10 shrink-0 text-subtle"
                      aria-label={`Verwijder ${row.name}`}
                      onClick={() => removeHousing(row.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.demand}
                    onChange={(demand) => updateHousing(row.id, { demand })}
                    ariaLabel={`Behoefte ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.available}
                    onChange={(available) => updateHousing(row.id, { available })}
                    ariaLabel={`Beschikbaar ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.quality}
                    onChange={(quality) => updateHousing(row.id, { quality })}
                    ariaLabel={`Kwaliteit ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <NumberField
                    value={row.affordable}
                    onChange={(affordable) => updateHousing(row.id, { affordable })}
                    ariaLabel={`Betaalbaar ${row.name}`}
                  />
                </td>
                <td className="border-b border-border px-1 py-2">
                  <CalcCell>{formatInt(row.matched)}</CalcCell>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <CalcCell>{formatInt(row.shortfall)}</CalcCell>
                </td>
                <td className="border-b border-border px-1 py-2">
                  <CalcCell
                    className={cn(
                      row.coverage === lowest && rows.length > 1 && "text-danger",
                    )}
                  >
                    {formatPct(row.coverage)}
                  </CalcCell>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-3 py-3 text-left text-sm font-medium">Totaal</th>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatInt(totals.demand)}
              </td>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatInt(totals.available)}
              </td>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatInt(totals.quality)}
              </td>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatInt(totals.affordable)}
              </td>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatInt(totals.matched)}
              </td>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatInt(totals.shortfall)}
              </td>
              <td className="px-3 py-3 text-right text-sm font-medium tabular-nums">
                {formatPct(totals.housingCoverage)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-4 rounded-md bg-bg px-4 py-3 text-sm text-muted">
        <span className="font-medium tracking-wide text-subtle uppercase">Formule</span>
        <span className="mt-1 block font-medium text-fg">
          AW = 100 × Σ M<sub>g</sub> / Σ D<sub>g</sub>
        </span>
        <span className="mt-1 block">
          Gekoppeld M<sub>g</sub> is het kleinste van behoefte, beschikbaar, kwaliteit en
          betaalbaar. Zo telt een woning nooit dubbel en nooit voorbij de toets.
        </span>
      </p>
    </section>
  );
}
