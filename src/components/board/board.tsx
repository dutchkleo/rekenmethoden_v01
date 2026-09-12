import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type DropAnimation,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { HardDrive, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { BoardCardFace } from "@/components/board/board-card";
import { BoardColumn } from "@/components/board/board-column";
import { CardDialog, type EditorState } from "@/components/board/card-dialog";
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
import { useBoardStore } from "@/lib/board/store";
import { COLUMN_IDS, COLUMN_META, type Card, type ColumnId } from "@/lib/board/types";
import { cn, todayIso } from "@/lib/utils";

const dropAnimation: DropAnimation = {
  duration: 250,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0.4" } },
  }),
};

const collisionDetection: CollisionDetection = (args) => {
  const pointer = pointerWithin(args);
  if (pointer.length > 0) return pointer;
  return closestCorners(args);
};

function isColumnId(id: UniqueIdentifier): id is ColumnId {
  return COLUMN_IDS.includes(String(id) as ColumnId);
}

function findColumn(
  id: UniqueIdentifier,
  columns: Record<ColumnId, string[]>,
): ColumnId | undefined {
  const key = String(id);
  if (isColumnId(key)) return key;
  return COLUMN_IDS.find((columnId) => columns[columnId].includes(key));
}

function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-primary", className)}
      aria-hidden
    >
      <rect x="3" y="8" width="4.5" height="12" rx="1.5" fill="currentColor" />
      <rect
        x="9.75"
        y="4"
        width="4.5"
        height="16"
        rx="1.5"
        fill="currentColor"
        opacity="0.72"
      />
      <rect
        x="16.5"
        y="10"
        width="4.5"
        height="10"
        rx="1.5"
        fill="currentColor"
        opacity="0.44"
      />
    </svg>
  );
}

function BoardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {COLUMN_IDS.map((id) => (
        <div key={id} className="h-[28rem] rounded-xl bg-surface/80 shadow-card" />
      ))}
    </div>
  );
}

export function Board() {
  const [hydrated, setHydrated] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Card | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const columns = useBoardStore((state) => state.columns);
  const cards = useBoardStore((state) => state.cards);
  const addCard = useBoardStore((state) => state.addCard);
  const updateCard = useBoardStore((state) => state.updateCard);
  const deleteCard = useBoardStore((state) => state.deleteCard);
  const moveCard = useBoardStore((state) => state.moveCard);
  const resetBoard = useBoardStore((state) => state.resetBoard);

  useEffect(() => {
    if (useBoardStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useBoardStore.persist.onFinishHydration(() => setHydrated(true));
    void useBoardStore.persist.rehydrate();
    return unsub;
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const total = useMemo(
    () => COLUMN_IDS.reduce((sum, id) => sum + columns[id].length, 0),
    [columns],
  );

  const activeCard = activeId ? cards[String(activeId)] : undefined;

  function cardsIn(columnId: ColumnId): Card[] {
    return columns[columnId]
      .map((id) => cards[id])
      .filter((card): card is Card => Boolean(card));
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const current = useBoardStore.getState().columns;
    const from = findColumn(active.id, current);
    const to = findColumn(over.id, current);
    if (!from || !to || from === to) return;

    const overIndex = isColumnId(over.id)
      ? current[to].length
      : Math.max(0, current[to].indexOf(String(over.id)));
    moveCard(String(active.id), to, overIndex);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const current = useBoardStore.getState().columns;
    const from = findColumn(active.id, current);
    const to = findColumn(over.id, current);
    if (!from || !to) return;

    const overIndex = isColumnId(over.id)
      ? current[to].length - (from === to ? 1 : 0)
      : current[to].indexOf(String(over.id));
    const fromIndex = current[from].indexOf(String(active.id));
    if (from === to && (overIndex === -1 || overIndex === fromIndex)) {
      return;
    }
    const cardId = String(active.id);
    moveCard(cardId, to, Math.max(0, overIndex));
    if (to === "kalender") {
      const card = useBoardStore.getState().cards[cardId];
      if (card && !card.date) {
        updateCard(cardId, {
          title: card.title,
          description: card.description,
          date: todayIso(),
        });
      }
    }
  }

  function handleSave(draft: { title: string; description: string; date?: string }) {
    if (!editor) return;
    if (editor.mode === "create") {
      addCard(editor.columnId, draft);
      toast.success(`Kaart toegevoegd aan ${COLUMN_META[editor.columnId].title.toLowerCase()}`);
    } else {
      updateCard(editor.card.id, draft);
      toast.success("Kaart bijgewerkt");
    }
    setEditor(null);
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg bg-surface shadow-card">
              <Mark className="size-7" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
                Stroom
              </h1>
              <p className="text-sm text-muted">Taken, kalender en notities op één bord</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="flex items-center gap-1.5 rounded-md bg-surface px-3 py-2 text-sm text-muted shadow-card">
            <HardDrive className="size-3.5" aria-hidden />
            Op dit apparaat
          </p>
          <p className="rounded-md bg-surface px-3 py-2 text-sm text-muted shadow-card">
            <span className="font-medium text-fg tabular-nums">{total}</span>{" "}
            {total === 1 ? "kaart" : "kaarten"}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10"
            onClick={() => setResetOpen(true)}
          >
            <RotateCcw className="size-3.5" />
            Voorbeeld
          </Button>
        </div>
      </header>

      {!hydrated ? (
        <BoardSkeleton />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {COLUMN_IDS.map((columnId) => (
              <BoardColumn
                key={columnId}
                columnId={columnId}
                cards={cardsIn(columnId)}
                onAdd={() => setEditor({ mode: "create", columnId })}
                onEdit={(card) => setEditor({ mode: "edit", card, columnId })}
                onDelete={setPendingDelete}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeCard ? <BoardCardFace card={activeCard} lifted /> : null}
          </DragOverlay>
        </DndContext>
      )}

      <CardDialog
        editor={editor}
        onClose={() => setEditor(null)}
        onSave={handleSave}
      />

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kaart verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `“${pendingDelete.title}” verdwijnt van het bord. Dit kun je niet ongedaan maken.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingDelete) return;
                deleteCard(pendingDelete.id);
                toast.success("Kaart verwijderd");
                setPendingDelete(null);
              }}
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voorbeeld herstellen?</AlertDialogTitle>
            <AlertDialogDescription>
              Alle huidige kaarten worden vervangen door het startvoorbeeld.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetBoard();
                toast.success("Voorbeeld hersteld");
                setResetOpen(false);
              }}
            >
              Herstellen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "var(--color-card)",
            color: "var(--color-fg)",
            border: "1px solid var(--color-border)",
          },
        }}
      />
    </div>
  );
}
