import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarDays, GripVertical, Trash2 } from "lucide-react";
import type { CSSProperties, HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import type { Card } from "@/lib/board/types";
import { cn, parseIsoDate } from "@/lib/utils";

type BoardCardFaceProps = {
  card: Card;
  onEdit?: () => void;
  onDelete?: () => void;
  lifted?: boolean;
  attributes?: HTMLAttributes<HTMLElement>;
  listeners?: HTMLAttributes<HTMLElement>;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
};

function dateLabel(iso: string): { text: string; tone: "muted" | "primary" | "danger" } {
  const date = parseIsoDate(iso);
  if (isToday(date)) return { text: "Vandaag", tone: "primary" };
  if (isTomorrow(date)) return { text: "Morgen", tone: "primary" };
  const formatted = format(date, "d MMM", { locale: nl });
  if (isPast(date)) return { text: formatted, tone: "danger" };
  return { text: formatted, tone: "muted" };
}

export function BoardCardFace({
  card,
  onEdit,
  onDelete,
  lifted,
  attributes,
  listeners,
  setActivatorNodeRef,
}: BoardCardFaceProps) {
  const chip = card.date ? dateLabel(card.date) : null;

  return (
    <article
      className={cn(
        "kanban-card group relative rounded-lg bg-card p-3.5 shadow-card",
        "transition-[box-shadow,transform,opacity] duration-200 ease-[var(--ease-smooth-out)]",
        lifted && "shadow-lift rotate-2 scale-105",
        !lifted && "hover:shadow-card-hover",
      )}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm text-subtle transition-colors duration-150 hover:bg-bg hover:text-fg touch-none"
          aria-label="Kaart verslepen"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="min-w-0 flex-1 rounded-sm text-left focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none"
        >
          <h3 className="font-medium leading-snug text-fg">{card.title}</h3>
          {card.description ? (
            <p className="mt-1 line-clamp-3 text-sm leading-normal text-muted">
              {card.description}
            </p>
          ) : null}
        </button>

        {onDelete ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-9 shrink-0 text-subtle opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            aria-label="Kaart verwijderen"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        ) : (
          <span className="size-9 shrink-0" />
        )}
      </div>

      {chip ? (
        <div className="mt-2.5 flex items-center gap-1.5 pl-11">
          <CalendarDays
            className={cn(
              "size-3.5",
              chip.tone === "primary" && "text-primary",
              chip.tone === "danger" && "text-danger",
              chip.tone === "muted" && "text-subtle",
            )}
          />
          <span
            className={cn(
              "text-xs font-medium tabular-nums",
              chip.tone === "primary" && "text-primary",
              chip.tone === "danger" && "text-danger",
              chip.tone === "muted" && "text-muted",
            )}
          >
            {chip.text}
          </span>
        </div>
      ) : null}
    </article>
  );
}

type SortableBoardCardProps = {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
};

export function SortableBoardCard({ card, onEdit, onDelete }: SortableBoardCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: "card", card },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "z-10 opacity-40")}
    >
      <BoardCardFace
        card={card}
        onEdit={onEdit}
        onDelete={onDelete}
        attributes={attributes}
        listeners={listeners}
        setActivatorNodeRef={setActivatorNodeRef}
      />
    </div>
  );
}
