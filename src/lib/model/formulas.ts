import type {
  ComputedHousehold,
  ComputedHousing,
  HouseholdType,
  HousingGroup,
  ModelState,
  Scenario,
  ScenarioResult,
  Totals,
} from "@/lib/model/types";

export function activeScenario(model: ModelState): Scenario {
  return (
    model.scenarios.find((item) => item.id === model.activeScenarioId) ??
    model.scenarios[0]
  );
}

export function computeHousing(group: HousingGroup): ComputedHousing {
  const matched = Math.max(
    0,
    Math.min(group.demand, group.available, group.quality, group.affordable),
  );
  const shortfall = Math.max(0, group.demand - matched);
  const coverage = group.demand > 0 ? matched / group.demand : 0;
  return { ...group, matched, shortfall, coverage };
}

export function computeHousehold(
  household: HouseholdType,
  adult: number,
  child: number,
): ComputedHousehold {
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
    joint,
  };
}

export function computeTotals(model: ModelState): Totals {
  const scenario = activeScenario(model);
  return totalsForScenario(model, scenario);
}

function totalsForScenario(model: ModelState, scenario: Scenario): Totals {
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
  for (const row of housing) {
    if (row.coverage < lowestGroupCoverage) {
      lowestGroupCoverage = row.coverage;
      lowestGroupName = row.name;
    }
  }

  const households = model.households.map((row) =>
    computeHousehold(row, scenario.adult, scenario.child),
  );
  const totalWeight = households.reduce((sum, row) => sum + row.weight, 0);
  const incomeCoverage =
    totalWeight > 0
      ? households.reduce((sum, row) => sum + row.weight * (row.sufficient ? 1 : 0), 0) /
        totalWeight
      : 0;
  const jointCoverage =
    totalWeight > 0
      ? households.reduce((sum, row) => sum + row.weight * (row.joint ? 1 : 0), 0) /
        totalWeight
      : 0;
  const gapMass = households.reduce((sum, row) => sum + row.weight * row.gap, 0);
  const shortWeight = households.reduce(
    (sum, row) => sum + (row.sufficient ? 0 : row.weight),
    0,
  );
  const avgGapAll = totalWeight > 0 ? gapMass / totalWeight : 0;
  const avgGapIfShort = shortWeight > 0 ? gapMass / shortWeight : 0;

  const grossCost =
    12 * (scenario.adult * model.finance.adultRecipients +
      scenario.child * model.finance.childRecipients);
  const netCost =
    grossCost +
    model.finance.adminCost -
    model.finance.extraTax -
    model.finance.savings;

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
    scenarioName: scenario.name,
  };
}

export function computeScenarioResults(model: ModelState): ScenarioResult[] {
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
      netCost: totals.netCost,
    };
  });
}
