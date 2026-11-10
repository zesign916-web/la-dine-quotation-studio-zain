import { DndContext, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

type Row = { id: string; category: boolean; description: string; qty: number; rate: number };
type Props = { rows: Row[]; currency: string; onChange: (id: string, key: keyof Row, value: string | number) => void; onRemove: (id: string) => void; onReorder: (rows: Row[]) => void };

export function SortableRows({ rows, currency, onChange, onRemove, onReorder }: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }));
  const format = (value: number) => `${Math.round(value || 0).toLocaleString("en-US")} ${currency}`;
  return <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
    if (!over || active.id === over.id) return;
    const from = rows.findIndex((row) => row.id === active.id);
    const to = rows.findIndex((row) => row.id === over.id);
    if (from !== -1 && to !== -1) onReorder(arrayMove(rows, from, to));
  }}><SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
    {rows.map((row) => <SortableRow key={row.id} row={row} format={format} onChange={onChange} onRemove={onRemove} />)}
  </SortableContext></DndContext>;
}

function SortableRow({ row, format, onChange, onRemove }: { row: Row; format: (value: number) => string; onChange: Props["onChange"]; onRemove: Props["onRemove"] }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  return <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`item-row ${row.category ? "category-row" : ""} ${isDragging ? "is-dragging" : ""}`}>
    <button className="drag-handle" aria-label={`Reorder ${row.description || "row"}`} title="Drag to reorder" {...attributes} {...listeners}><GripVertical size={16}/></button>
    {row.category ? <><input className="category-description" aria-label="Category name" placeholder="CATEGORY NAME" value={row.description} onChange={(e) => onChange(row.id, "description", e.target.value)}/><button className="delete-btn" title="Delete category" onClick={() => onRemove(row.id)}><Trash2 size={14}/></button></> : <><input aria-label="Description" placeholder="Add description…" value={row.description} onChange={(e) => onChange(row.id, "description", e.target.value)}/><input aria-label="Quantity" type="number" min="0" placeholder="0" value={row.qty || ""} onChange={(e) => onChange(row.id, "qty", Number(e.target.value))}/><input aria-label="Rate" type="number" min="0" placeholder="0" value={row.rate || ""} onChange={(e) => onChange(row.id, "rate", Number(e.target.value))}/><strong>{format(row.qty * row.rate)}</strong><button className="delete-btn" title="Delete item" onClick={() => onRemove(row.id)}><Trash2 size={14}/></button></>}
  </div>;
}
