import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarDays, ListTodo, Plus, StickyNote } from "lucide-react";
import { SortableBoardCard } from "@/components/board/board-card";
import { Button } from "@/components/ui/button";
import { COLUMN_META, type Card, type ColumnId } from "@/lib/board/types";
import { cn, todayIso } from "@/lib/utils";

const ICONS = {
  taken: ListTodo,
  kalender: CalendarDays,
  notities: StickyNote,
} as const;

type BoardColumnProps = {
  columnId: ColumnId;
  cards: Card[];
  onAdd: () => void;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
};

function WeekStrip({ cards }: { cards: Card[] }) {
  const dated = new Set(cards.map((card) => card.date).filter(Boolean) as string[]);
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const iso = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    return { date, iso, has: dated.has(iso) };
  });

  return (
    <div className="mb-3 grid grid-cols-7 gap-1">
      {days.map(({ date, iso, has }) => {
        const current = iso === todayIso();
        return (
          <div
            key={iso}
            className={cn(
              "flex flex-col items-center rounded-sm py-1.5",
              current && "bg-primary text-primary-fg",
            )}
          >
            <span
              className={cn(
                "text-xs font-medium uppercase tracking-wide",
                current ? "text-primary-fg/80" : "text-subtle",
              )}
            >
              {format(date, "EEEEE", { locale: nl })}
            </span>
            <span
              className={cn(
                "text-xs tabular-nums",
                current ? "font-medium" : "text-fg",
              )}
            >
              {format(date, "d")}
            </span>
            <span
              className={cn(
                "mt-0.5 size-1 rounded-full",
                has ? (current ? "bg-primary-fg" : "bg-primary") : "bg-transparent",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

export function BoardColumn({
  columnId,
  cards,
  onAdd,
  onEdit,
  onDelete,
}: BoardColumnProps) {
  const meta = COLUMN_META[columnId];
  const Icon = ICONS[columnId];
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
    data: { type: "column", columnId },
  });

  const ids = cards.map((card) => card.id);

  return (
    <section
      className={cn(
        "kanban-column flex min-h-[28rem] w-[min(85vw,22rem)] shrink-0 snap-start flex-col rounded-xl bg-surface p-3 shadow-card md:min-h-0 md:w-auto md:min-w-0",
        "transition-[box-shadow] duration-200 ease-[var(--ease-smooth-out)]",
        isOver && "shadow-card-hover ring-2 ring-primary/25",
      )}
      aria-labelledby={`column-${columnId}`}
    >
      <header className="mb-3 flex items-start justify-between gap-2 px-1 pt-1">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-primary" aria-hidden />
            <h2
              id={`column-${columnId}`}
              className="font-display text-lg font-medium tracking-tight text-fg"
            >
              {meta.title}
            </h2>
            <span className="rounded-full bg-bg px-2 py-0.5 text-xs font-medium text-muted tabular-nums">
              {cards.length}
            </span>
          </div>
          <p className="mt-0.5 pl-6 text-xs text-muted">{meta.hint}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-10 shrink-0"
          onClick={onAdd}
          aria-label={`Kaart toevoegen aan ${meta.title}`}
        >
          <Plus className="size-4" />
        </Button>
      </header>

      {columnId === "kalender" ? <WeekStrip cards={cards} /> : null}

      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-40 flex-1 flex-col gap-2.5 rounded-lg p-0.5",
          isOver && "bg-bg/70",
        )}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <SortableBoardCard
              key={card.id}
              card={card}
              onEdit={() => onEdit(card)}
              onDelete={() => onDelete(card)}
            />
          ))}
        </SortableContext>

        {cards.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-10 text-center">
            <p className="text-sm text-muted">Nog geen kaarten</p>
            <button
              type="button"
              onClick={onAdd}
              className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Voeg de eerste toe
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
