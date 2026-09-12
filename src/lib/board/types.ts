export const COLUMN_IDS = ["taken", "kalender", "notities"] as const;

export type ColumnId = (typeof COLUMN_IDS)[number];

export type Card = {
  id: string;
  title: string;
  description: string;
  date?: string;
  createdAt: number;
};

export type BoardData = {
  columns: Record<ColumnId, string[]>;
  cards: Record<string, Card>;
};

export const COLUMN_META: Record<
  ColumnId,
  { title: string; hint: string }
> = {
  taken: {
    title: "Taken",
    hint: "Werk dat gedaan moet worden",
  },
  kalender: {
    title: "Kalender",
    hint: "Afspraken en momenten",
  },
  notities: {
    title: "Notities",
    hint: "Losse gedachten en context",
  },
};
