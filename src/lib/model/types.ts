export type Scenario = {
  id: number;
  name: string;
  adult: number;
  child: number;
};

export type HousingGroup = {
  id: string;
  name: string;
  demand: number;
  available: number;
  quality: number;
  affordable: number;
};

export type HouseholdType = {
  id: string;
  name: string;
  adults: number;
  children: number;
  weight: number;
  otherIncome: number;
  housingEnergy: number;
  otherMin: number;
  adequateHome: boolean;
};

export type Finance = {
  adultRecipients: number;
  childRecipients: number;
  adminCost: number;
  extraTax: number;
  savings: number;
};

export type ModelState = {
  area: string;
  asOf: string;
  priceLevel: string;
  targetCoverage: number;
  activeScenarioId: number;
  scenarios: Scenario[];
  housing: HousingGroup[];
  households: HouseholdType[];
  finance: Finance;
};

export type ComputedHousing = HousingGroup & {
  matched: number;
  shortfall: number;
  coverage: number;
};

export type ComputedHousehold = HouseholdType & {
  basicIncome: number;
  resources: number;
  minimum: number;
  saldo: number;
  gap: number;
  sufficient: boolean;
  ratio: number;
  joint: boolean;
};

export type Totals = {
  demand: number;
  available: number;
  quality: number;
  affordable: number;
  matched: number;
  shortfall: number;
  housingCoverage: number;
  lowestGroupCoverage: number;
  lowestGroupName: string;
  incomeCoverage: number;
  jointCoverage: number;
  avgGapAll: number;
  avgGapIfShort: number;
  shortWeight: number;
  totalWeight: number;
  grossCost: number;
  netCost: number;
  adult: number;
  child: number;
  scenarioName: string;
};

export type ScenarioResult = {
  id: number;
  name: string;
  adult: number;
  child: number;
  incomeCoverage: number;
  jointCoverage: number;
  avgGapIfShort: number;
  grossCost: number;
  netCost: number;
};
