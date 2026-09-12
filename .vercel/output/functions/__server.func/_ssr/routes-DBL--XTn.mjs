import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as Slot, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose, v as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as RotateCcw, c as HardDrive, i as StickyNote, l as GripVertical, o as Plus, r as Trash2, s as ListTodo, t as X, u as CalendarDays } from "../_libs/lucide-react.mjs";
import { _ as useSensors, a as MouseSensor, c as defaultDropAnimationSideEffects, f as pointerWithin, g as useSensor, h as useDroppable, i as KeyboardSensor, n as DragOverlay, o as TouchSensor, s as closestCorners, t as DndContext, v as CSS } from "../_libs/@dnd-kit/core+[...].mjs";
import { i as verticalListSortingStrategy, n as sortableKeyboardCoordinates, r as useSortable, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as format, i as isPast, n as isTomorrow, r as isToday, t as nl } from "../_libs/date-fns.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DBL--XTn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
function todayIso() {
	const now = /* @__PURE__ */ new Date();
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function parseIsoDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function addDaysIso(days) {
	const date = /* @__PURE__ */ new Date();
	date.setDate(date.getDate() + days);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-card hover:opacity-90",
			secondary: "bg-surface text-fg shadow-card hover:bg-card",
			ghost: "text-muted hover:bg-surface hover:text-fg",
			outline: "bg-transparent text-fg shadow-card hover:bg-surface",
			danger: "bg-danger text-danger-fg shadow-card hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3",
			icon: "size-11",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
Button.displayName = "Button";
function dateLabel(iso) {
	const date = parseIsoDate(iso);
	if (isToday(date)) return {
		text: "Vandaag",
		tone: "primary"
	};
	if (isTomorrow(date)) return {
		text: "Morgen",
		tone: "primary"
	};
	const formatted = format(date, "d MMM", { locale: nl });
	if (isPast(date)) return {
		text: formatted,
		tone: "danger"
	};
	return {
		text: formatted,
		tone: "muted"
	};
}
function BoardCardFace({ card, onEdit, onDelete, lifted, attributes, listeners, setActivatorNodeRef }) {
	const chip = card.date ? dateLabel(card.date) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("kanban-card group relative rounded-lg bg-card p-3.5 shadow-card", "transition-[box-shadow,transform,opacity] duration-200 ease-[var(--ease-smooth-out)]", lifted && "shadow-lift rotate-2 scale-105", !lifted && "hover:shadow-card-hover"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm text-subtle transition-colors duration-150 hover:bg-bg hover:text-fg touch-none",
					"aria-label": "Kaart verslepen",
					ref: setActivatorNodeRef,
					...attributes,
					...listeners,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onEdit,
					className: "min-w-0 flex-1 rounded-sm text-left focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium leading-snug text-fg",
						children: card.title
					}), card.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-3 text-sm leading-normal text-muted",
						children: card.description
					}) : null]
				}),
				onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					className: "size-9 shrink-0 text-subtle opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100",
					"aria-label": "Kaart verwijderen",
					onClick: (event) => {
						event.stopPropagation();
						onDelete();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-9 shrink-0" })
			]
		}), chip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2.5 flex items-center gap-1.5 pl-11",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: cn("size-3.5", chip.tone === "primary" && "text-primary", chip.tone === "danger" && "text-danger", chip.tone === "muted" && "text-subtle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-xs font-medium tabular-nums", chip.tone === "primary" && "text-primary", chip.tone === "danger" && "text-danger", chip.tone === "muted" && "text-muted"),
				children: chip.text
			})]
		}) : null]
	});
}
function SortableBoardCard({ card, onEdit, onDelete }) {
	const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
		id: card.id,
		data: {
			type: "card",
			card
		}
	});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: setNodeRef,
		style,
		className: cn(isDragging && "z-10 opacity-40"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardCardFace, {
			card,
			onEdit,
			onDelete,
			attributes,
			listeners,
			setActivatorNodeRef
		})
	});
}
var COLUMN_IDS = [
	"taken",
	"kalender",
	"notities"
];
var COLUMN_META = {
	taken: {
		title: "Taken",
		hint: "Werk dat gedaan moet worden"
	},
	kalender: {
		title: "Kalender",
		hint: "Afspraken en momenten"
	},
	notities: {
		title: "Notities",
		hint: "Losse gedachten en context"
	}
};
var ICONS = {
	taken: ListTodo,
	kalender: CalendarDays,
	notities: StickyNote
};
function WeekStrip({ cards }) {
	const dated = new Set(cards.map((card) => card.date).filter(Boolean));
	const days = Array.from({ length: 7 }, (_, index) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() + index);
		const iso = [
			date.getFullYear(),
			String(date.getMonth() + 1).padStart(2, "0"),
			String(date.getDate()).padStart(2, "0")
		].join("-");
		return {
			date,
			iso,
			has: dated.has(iso)
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-3 grid grid-cols-7 gap-1",
		children: days.map(({ date, iso, has }) => {
			const current = iso === todayIso();
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex flex-col items-center rounded-sm py-1.5", current && "bg-primary text-primary-fg"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs font-medium uppercase tracking-wide", current ? "text-primary-fg/80" : "text-subtle"),
						children: format(date, "EEEEE", { locale: nl })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-xs tabular-nums", current ? "font-medium" : "text-fg"),
						children: format(date, "d")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-0.5 size-1 rounded-full", has ? current ? "bg-primary-fg" : "bg-primary" : "bg-transparent") })
				]
			}, iso);
		})
	});
}
function BoardColumn({ columnId, cards, onAdd, onEdit, onDelete }) {
	const meta = COLUMN_META[columnId];
	const Icon = ICONS[columnId];
	const { setNodeRef, isOver } = useDroppable({
		id: columnId,
		data: {
			type: "column",
			columnId
		}
	});
	const ids = cards.map((card) => card.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("kanban-column flex min-h-[28rem] w-[min(85vw,22rem)] shrink-0 snap-start flex-col rounded-xl bg-surface p-3 shadow-card md:min-h-0 md:w-auto md:min-w-0", "transition-[box-shadow] duration-200 ease-[var(--ease-smooth-out)]", isOver && "shadow-card-hover ring-2 ring-primary/25"),
		"aria-labelledby": `column-${columnId}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-start justify-between gap-2 px-1 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4 text-primary",
								"aria-hidden": true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: `column-${columnId}`,
								className: "font-display text-lg font-medium tracking-tight text-fg",
								children: meta.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-bg px-2 py-0.5 text-xs font-medium text-muted tabular-nums",
								children: cards.length
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 pl-6 text-xs text-muted",
						children: meta.hint
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon-sm",
					className: "size-10 shrink-0",
					onClick: onAdd,
					"aria-label": `Kaart toevoegen aan ${meta.title}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})]
			}),
			columnId === "kalender" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekStrip, { cards }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: setNodeRef,
				className: cn("flex min-h-40 flex-1 flex-col gap-2.5 rounded-lg p-0.5", isOver && "bg-bg/70"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
					items: ids,
					strategy: verticalListSortingStrategy,
					children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableBoardCard, {
						card,
						onEdit: () => onEdit(card),
						onDelete: () => onDelete(card)
					}, card.id))
				}), cards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nog geen kaarten"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onAdd,
						className: "mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline",
						children: "Voeg de eerste toe"
					})]
				}) : null]
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-overlay", "data-[state=open]:animate-in data-[state=open]:fade-in-0", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-surface p-6 shadow-lift", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		className: "absolute top-3 right-3 flex size-11 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-bg hover:text-fg focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:outline-none",
		"aria-label": "Sluiten",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight text-fg", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm leading-normal text-muted", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		type,
		className: cn("flex h-11 w-full rounded-md bg-card px-3 text-base text-fg shadow-card", "placeholder:text-subtle", "transition-[box-shadow] duration-150 ease-[var(--ease-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-fg", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("flex min-h-28 w-full rounded-md bg-card px-3 py-2.5 text-base text-fg shadow-card", "placeholder:text-subtle", "transition-[box-shadow] duration-150 ease-[var(--ease-out)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
});
Textarea.displayName = "Textarea";
function CardDialog({ editor, onClose, onSave }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const open = editor !== null;
	const isKalender = editor?.columnId === "kalender";
	(0, import_react.useEffect)(() => {
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
	function handleSubmit(event) {
		event.preventDefault();
		const trimmed = title.trim();
		if (!trimmed) return;
		onSave({
			title: trimmed,
			description: description.trim(),
			date: date || void 0
		});
	}
	const columnTitle = editor ? COLUMN_META[editor.columnId].title : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editor?.mode === "edit" ? "Kaart bewerken" : "Nieuwe kaart" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: editor?.mode === "edit" ? `Wijzig titel en beschrijving in ${columnTitle.toLowerCase()}.` : `Voeg een kaart toe aan ${columnTitle.toLowerCase()}.` })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "card-title",
						children: "Titel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "card-title",
						value: title,
						onChange: (event) => setTitle(event.target.value),
						placeholder: "Korte, duidelijke titel",
						autoComplete: "off",
						required: true,
						maxLength: 120
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "card-description",
						children: "Beschrijving"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "card-description",
						value: description,
						onChange: (event) => setDescription(event.target.value),
						placeholder: "Optionele toelichting",
						maxLength: 800
					})]
				}),
				isKalender ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "card-date",
						children: "Datum"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "card-date",
						type: "date",
						value: date,
						onChange: (event) => setDate(event.target.value),
						required: true
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onClose,
					children: "Annuleren"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !title.trim(),
					children: editor?.mode === "edit" ? "Opslaan" : "Toevoegen"
				})] })
			]
		}) })
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	ref,
	className: cn("fixed inset-0 z-50 bg-overlay", "data-[state=open]:animate-in data-[state=open]:fade-in-0", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className),
	...props
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-surface p-6 shadow-lift", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight text-fg", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm leading-normal text-muted", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants({ variant: "danger" }), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "ghost" }), className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function seedBoard() {
	const cards = [
		{
			id: uid(),
			title: "Weekplanning afronden",
			description: "Verdeel openstaande punten over maandag tot woensdag en markeer wat wacht op iemand anders.",
			createdAt: Date.now() - 3456e5
		},
		{
			id: uid(),
			title: "Offertes vergelijken",
			description: "Drie partijen naast elkaar: prijs, levertijd en wat er wel of niet in nazorg zit.",
			createdAt: Date.now() - 2592e5
		},
		{
			id: uid(),
			title: "Foto's in de projectmap",
			description: "Inspectiebeelden van de laatste rondgang archiveren, per ruimte.",
			createdAt: Date.now() - 1728e5
		},
		{
			id: uid(),
			title: "Overleg opdrachtgever",
			description: "Planning doornemen, open vragen en de volgende beslissing vastleggen.",
			date: addDaysIso(3),
			createdAt: Date.now() - 864e5
		},
		{
			id: uid(),
			title: "Rondgang op locatie",
			description: "Kozijnen, dakrand en vochtplekken nalopen. Foto's maken bij twijfel.",
			date: addDaysIso(8),
			createdAt: Date.now() - 432e6
		},
		{
			id: uid(),
			title: "Condens noordgevel",
			description: "Eerst meten, niet meteen isoleren. Kan condens zijn in plaats van lekkage.",
			createdAt: Date.now() - 5184e5
		},
		{
			id: uid(),
			title: "Contact lokale timmerman",
			description: "Snel ter plaatse, duidelijke prijs. Vragen naar beschikbaarheid in oktober.",
			createdAt: Date.now() - 6048e5
		}
	];
	return {
		cards: Object.fromEntries(cards.map((card) => [card.id, card])),
		columns: {
			taken: [
				cards[0].id,
				cards[1].id,
				cards[2].id
			],
			kalender: [cards[3].id, cards[4].id],
			notities: [cards[5].id, cards[6].id]
		}
	};
}
function emptyColumns() {
	return {
		taken: [],
		kalender: [],
		notities: []
	};
}
function removeFromColumns(columns, cardId) {
	const next = emptyColumns();
	for (const id of COLUMN_IDS) next[id] = columns[id].filter((item) => item !== cardId);
	return next;
}
var initial = seedBoard();
var useBoardStore = create()(persist((set, get) => ({
	...initial,
	addCard: (columnId, draft) => {
		const id = uid();
		const card = {
			id,
			title: draft.title.trim(),
			description: draft.description.trim(),
			createdAt: Date.now(),
			...columnId === "kalender" ? { date: draft.date || addDaysIso(0) } : draft.date ? { date: draft.date } : {}
		};
		set((state) => ({
			cards: {
				...state.cards,
				[id]: card
			},
			columns: {
				...state.columns,
				[columnId]: [...state.columns[columnId], id]
			}
		}));
		return id;
	},
	updateCard: (id, draft) => {
		set((state) => {
			const existing = state.cards[id];
			if (!existing) return state;
			return { cards: {
				...state.cards,
				[id]: {
					...existing,
					title: draft.title.trim(),
					description: draft.description.trim(),
					date: draft.date || void 0
				}
			} };
		});
	},
	deleteCard: (id) => {
		set((state) => {
			const { [id]: _removed, ...cards } = state.cards;
			return {
				cards,
				columns: removeFromColumns(state.columns, id)
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
		set({ columns: {
			...without,
			[toColumn]: target
		} });
	},
	resetBoard: () => {
		set(seedBoard());
	}
}), {
	name: "stroom-board-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({
		columns: state.columns,
		cards: state.cards
	}),
	version: 1
}));
var dropAnimation = {
	duration: 250,
	easing: "cubic-bezier(0.22, 1, 0.36, 1)",
	sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } })
};
var collisionDetection = (args) => {
	const pointer = pointerWithin(args);
	if (pointer.length > 0) return pointer;
	return closestCorners(args);
};
function isColumnId(id) {
	return COLUMN_IDS.includes(String(id));
}
function findColumn(id, columns) {
	const key = String(id);
	if (isColumnId(key)) return key;
	return COLUMN_IDS.find((columnId) => columns[columnId].includes(key));
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: cn("text-primary", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "8",
				width: "4.5",
				height: "12",
				rx: "1.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9.75",
				y: "4",
				width: "4.5",
				height: "16",
				rx: "1.5",
				fill: "currentColor",
				opacity: "0.72"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16.5",
				y: "10",
				width: "4.5",
				height: "10",
				rx: "1.5",
				fill: "currentColor",
				opacity: "0.44"
			})
		]
	});
}
function BoardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-3",
		children: COLUMN_IDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[28rem] rounded-xl bg-surface/80 shadow-card" }, id))
	});
}
function Board() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [editor, setEditor] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	const columns = useBoardStore((state) => state.columns);
	const cards = useBoardStore((state) => state.cards);
	const addCard = useBoardStore((state) => state.addCard);
	const updateCard = useBoardStore((state) => state.updateCard);
	const deleteCard = useBoardStore((state) => state.deleteCard);
	const moveCard = useBoardStore((state) => state.moveCard);
	const resetBoard = useBoardStore((state) => state.resetBoard);
	(0, import_react.useEffect)(() => {
		if (useBoardStore.persist.hasHydrated()) {
			setHydrated(true);
			return;
		}
		const unsub = useBoardStore.persist.onFinishHydration(() => setHydrated(true));
		useBoardStore.persist.rehydrate();
		return unsub;
	}, []);
	const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor, { activationConstraint: {
		delay: 180,
		tolerance: 6
	} }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const total = (0, import_react.useMemo)(() => COLUMN_IDS.reduce((sum, id) => sum + columns[id].length, 0), [columns]);
	const activeCard = activeId ? cards[String(activeId)] : void 0;
	function cardsIn(columnId) {
		return columns[columnId].map((id) => cards[id]).filter((card) => Boolean(card));
	}
	function handleDragStart(event) {
		setActiveId(event.active.id);
	}
	function handleDragOver(event) {
		const { active, over } = event;
		if (!over) return;
		const current = useBoardStore.getState().columns;
		const from = findColumn(active.id, current);
		const to = findColumn(over.id, current);
		if (!from || !to || from === to) return;
		const overIndex = isColumnId(over.id) ? current[to].length : Math.max(0, current[to].indexOf(String(over.id)));
		moveCard(String(active.id), to, overIndex);
	}
	function handleDragEnd(event) {
		const { active, over } = event;
		setActiveId(null);
		if (!over) return;
		const current = useBoardStore.getState().columns;
		const from = findColumn(active.id, current);
		const to = findColumn(over.id, current);
		if (!from || !to) return;
		const overIndex = isColumnId(over.id) ? current[to].length - (from === to ? 1 : 0) : current[to].indexOf(String(over.id));
		const fromIndex = current[from].indexOf(String(active.id));
		if (from === to && (overIndex === -1 || overIndex === fromIndex)) return;
		const cardId = String(active.id);
		moveCard(cardId, to, Math.max(0, overIndex));
		if (to === "kalender") {
			const card = useBoardStore.getState().cards[cardId];
			if (card && !card.date) updateCard(cardId, {
				title: card.title,
				description: card.description,
				date: todayIso()
			});
		}
	}
	function handleSave(draft) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 items-center justify-center rounded-lg bg-surface shadow-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-7" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl",
							children: "Stroom"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Taken, kalender en notities op één bord"
						})] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 rounded-md bg-surface px-3 py-2 text-sm text-muted shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {
								className: "size-3.5",
								"aria-hidden": true
							}), "Op dit apparaat"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-md bg-surface px-3 py-2 text-sm text-muted shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-fg tabular-nums",
									children: total
								}),
								" ",
								total === 1 ? "kaart" : "kaarten"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							className: "h-10",
							onClick: () => setResetOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Voorbeeld"]
						})
					]
				})]
			}),
			!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DndContext, {
				sensors,
				collisionDetection,
				onDragStart: handleDragStart,
				onDragOver: handleDragOver,
				onDragEnd: handleDragEnd,
				onDragCancel: () => setActiveId(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0",
					children: COLUMN_IDS.map((columnId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardColumn, {
						columnId,
						cards: cardsIn(columnId),
						onAdd: () => setEditor({
							mode: "create",
							columnId
						}),
						onEdit: (card) => setEditor({
							mode: "edit",
							card,
							columnId
						}),
						onDelete: setPendingDelete
					}, columnId))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragOverlay, {
					dropAnimation,
					children: activeCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardCardFace, {
						card: activeCard,
						lifted: true
					}) : null
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDialog, {
				editor,
				onClose: () => setEditor(null),
				onSave: handleSave
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: pendingDelete !== null,
				onOpenChange: (open) => !open && setPendingDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Kaart verwijderen?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: pendingDelete ? `“${pendingDelete.title}” verdwijnt van het bord. Dit kun je niet ongedaan maken.` : null })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Annuleren" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (!pendingDelete) return;
						deleteCard(pendingDelete.id);
						toast.success("Kaart verwijderd");
						setPendingDelete(null);
					},
					children: "Verwijderen"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: resetOpen,
				onOpenChange: setResetOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Voorbeeld herstellen?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Alle huidige kaarten worden vervangen door het startvoorbeeld." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Annuleren" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						resetBoard();
						toast.success("Voorbeeld hersteld");
						setResetOpen(false);
					},
					children: "Herstellen"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-center",
				toastOptions: {
					className: "font-sans",
					style: {
						background: "var(--color-card)",
						color: "var(--color-fg)",
						border: "1px solid var(--color-border)"
					}
				}
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {}) });
}
//#endregion
export { Home as component };
