import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { seedModel } from "@/lib/model/seed";
import type {
  Finance,
  HouseholdType,
  HousingGroup,
  ModelState,
  Scenario,
} from "@/lib/model/types";
import { uid } from "@/lib/utils";

type Actions = {
  setMeta: (patch: Partial<Pick<ModelState, "area" | "asOf" | "priceLevel" | "targetCoverage">>) => void;
  setScenario: (id: number) => void;
  updateScenario: (id: number, patch: Partial<Pick<Scenario, "adult" | "child" | "name">>) => void;
  updateHousing: (id: string, patch: Partial<HousingGroup>) => void;
  addHousing: () => void;
  removeHousing: (id: string) => void;
  updateHousehold: (id: string, patch: Partial<HouseholdType>) => void;
  addHousehold: () => void;
  removeHousehold: (id: string) => void;
  updateFinance: (patch: Partial<Finance>) => void;
  reset: () => void;
};

export const useModelStore = create<ModelState & Actions>()(
  persist(
    (set) => ({
      ...seedModel(),
      setMeta: (patch) => set(patch),
      setScenario: (id) => set({ activeScenarioId: id }),
      updateScenario: (id, patch) =>
        set((state) => ({
          scenarios: state.scenarios.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),
      updateHousing: (id, patch) =>
        set((state) => ({
          housing: state.housing.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),
      addHousing: () =>
        set((state) => ({
          housing: [
            ...state.housing,
            {
              id: uid(),
              name: "Nieuwe woninggroep",
              demand: 0,
              available: 0,
              quality: 0,
              affordable: 0,
            },
          ],
        })),
      removeHousing: (id) =>
        set((state) => ({
          housing: state.housing.filter((item) => item.id !== id),
        })),
      updateHousehold: (id, patch) =>
        set((state) => ({
          households: state.households.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),
      addHousehold: () =>
        set((state) => ({
          households: [
            ...state.households,
            {
              id: uid(),
              name: "Nieuw huishoudtype",
              adults: 1,
              children: 0,
              weight: 0,
              otherIncome: 0,
              housingEnergy: 0,
              otherMin: 0,
              adequateHome: true,
            },
          ],
        })),
      removeHousehold: (id) =>
        set((state) => ({
          households: state.households.filter((item) => item.id !== id),
        })),
      updateFinance: (patch) =>
        set((state) => ({ finance: { ...state.finance, ...patch } })),
      reset: () => set(seedModel()),
    }),
    {
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
        finance: state.finance,
      }),
    },
  ),
);
