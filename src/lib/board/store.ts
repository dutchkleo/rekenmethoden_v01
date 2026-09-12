import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addDaysIso, uid } from "@/lib/utils";
import {
  COLUMN_IDS,
  type BoardData,
  type Card,
  type ColumnId,
} from "@/lib/board/types";

export type CardDraft = {
  title: string;
  description: string;
  date?: string;
};

type BoardState = BoardData & {
  addCard: (columnId: ColumnId, draft: CardDraft) => string;
  updateCard: (id: string, draft: CardDraft) => void;
  deleteCard: (id: string) => void;
  moveCard: (id: string, toColumn: ColumnId, toIndex: number) => void;
  resetBoard: () => void;
};

function seedBoard(): BoardData {
  const cards: Card[] = [
    {
      id: uid(),
      title: "Weekplanning afronden",
      description:
        "Verdeel openstaande punten over maandag tot woensdag en markeer wat wacht op iemand anders.",
      createdAt: Date.now() - 86_400_000 * 4,
    },
    {
      id: uid(),
      title: "Offertes vergelijken",
      description:
        "Drie partijen naast elkaar: prijs, levertijd en wat er wel of niet in nazorg zit.",
      createdAt: Date.now() - 86_400_000 * 3,
    },
    {
      id: uid(),
      title: "Foto's in de projectmap",
      description: "Inspectiebeelden van de laatste rondgang archiveren, per ruimte.",
      createdAt: Date.now() - 86_400_000 * 2,
    },
    {
      id: uid(),
      title: "Overleg opdrachtgever",
      description: "Planning doornemen, open vragen en de volgende beslissing vastleggen.",
      date: addDaysIso(3),
      createdAt: Date.now() - 86_400_000,
    },
    {
      id: uid(),
      title: "Rondgang op locatie",
      description: "Kozijnen, dakrand en vochtplekken nalopen. Foto's maken bij twijfel.",
      date: addDaysIso(8),
      createdAt: Date.now() - 86_400_000 * 5,
    },
    {
      id: uid(),
      title: "Condens noordgevel",
      description:
        "Eerst meten, niet meteen isoleren. Kan condens zijn in plaats van lekkage.",
      createdAt: Date.now() - 86_400_000 * 6,
    },
    {
      id: uid(),
      title: "Contact lokale timmerman",
      description: "Snel ter plaatse, duidelijke prijs. Vragen naar beschikbaarheid in oktober.",
      createdAt: Date.now() - 86_400_000 * 7,
    },
  ];

  const byId = Object.fromEntries(cards.map((card) => [card.id, card]));

  return {
    cards: byId,
    columns: {
      taken: [cards[0].id, cards[1].id, cards[2].id],
      kalender: [cards[3].id, cards[4].id],
      notities: [cards[5].id, cards[6].id],
    },
  };
}

function emptyColumns(): Record<ColumnId, string[]> {
  return { taken: [], kalender: [], notities: [] };
}

function removeFromColumns(
  columns: Record<ColumnId, string[]>,
  cardId: string,
): Record<ColumnId, string[]> {
  const next = emptyColumns();
  for (const id of COLUMN_IDS) {
    next[id] = columns[id].filter((item) => item !== cardId);
  }
  return next;
}

const initial = seedBoard();

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      ...initial,
      addCard: (columnId, draft) => {
        const id = uid();
        const card: Card = {
          id,
          title: draft.title.trim(),
          description: draft.description.trim(),
          createdAt: Date.now(),
          ...(columnId === "kalender"
            ? { date: draft.date || addDaysIso(0) }
            : draft.date
              ? { date: draft.date }
              : {}),
        };
        set((state) => ({
          cards: { ...state.cards, [id]: card },
          columns: {
            ...state.columns,
            [columnId]: [...state.columns[columnId], id],
          },
        }));
        return id;
      },
      updateCard: (id, draft) => {
        set((state) => {
          const existing = state.cards[id];
          if (!existing) return state;
          return {
            cards: {
              ...state.cards,
              [id]: {
                ...existing,
                title: draft.title.trim(),
                description: draft.description.trim(),
                date: draft.date || undefined,
              },
            },
          };
        });
      },
      deleteCard: (id) => {
        set((state) => {
          const { [id]: _removed, ...cards } = state.cards;
          return {
            cards,
            columns: removeFromColumns(state.columns, id),
          };
        });
      },
      moveCard: (id, toColumn, toIndex) => {
        const state = get();
        if (!state.cards[id]) return;
        const without = removeFromColumns(state.columns, id);
        const target = [...without[toColumn]];
        const index = Math.max(0, Math.min(toIndex, target.length));
        target.splice(index, 0, id);
        set({
          columns: { ...without, [toColumn]: target },
        });
      },
      resetBoard: () => {
        set(seedBoard());
      },
    }),
    {
      name: "stroom-board-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        columns: state.columns,
        cards: state.cards,
      }),
      version: 1,
    },
  ),
);
