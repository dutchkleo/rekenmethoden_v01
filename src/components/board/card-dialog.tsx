import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COLUMN_META, type Card, type ColumnId } from "@/lib/board/types";
import type { CardDraft } from "@/lib/board/store";
import { todayIso } from "@/lib/utils";

export type EditorState =
  | { mode: "create"; columnId: ColumnId }
  | { mode: "edit"; card: Card; columnId: ColumnId };

type CardDialogProps = {
  editor: EditorState | null;
  onClose: () => void;
  onSave: (draft: CardDraft) => void;
};

export function CardDialog({ editor, onClose, onSave }: CardDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const open = editor !== null;
  const isKalender = editor?.columnId === "kalender";

  useEffect(() => {
    if (!editor) return;
    if (editor.mode === "edit") {
      setTitle(editor.card.title);
      setDescription(editor.card.description);
      setDate(editor.card.date ?? "");
    } else {
      setTitle("");
      setDescription("");
      setDate(isKalender ? todayIso() : "");
    }
  }, [editor, isKalender]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave({
      title: trimmed,
      description: description.trim(),
      date: date || undefined,
    });
  }

  const columnTitle = editor ? COLUMN_META[editor.columnId].title : "";

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>
              {editor?.mode === "edit" ? "Kaart bewerken" : "Nieuwe kaart"}
            </DialogTitle>
            <DialogDescription>
              {editor?.mode === "edit"
                ? `Wijzig titel en beschrijving in ${columnTitle.toLowerCase()}.`
                : `Voeg een kaart toe aan ${columnTitle.toLowerCase()}.`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="card-title">Titel</Label>
            <Input
              id="card-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Korte, duidelijke titel"
              autoComplete="off"
              required
              maxLength={120}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="card-description">Beschrijving</Label>
            <Textarea
              id="card-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optionele toelichting"
              maxLength={800}
            />
          </div>

          {isKalender ? (
            <div className="grid gap-2">
              <Label htmlFor="card-date">Datum</Label>
              <Input
                id="card-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>
          ) : null}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuleren
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {editor?.mode === "edit" ? "Opslaan" : "Toevoegen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
