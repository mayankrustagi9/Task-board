import { useState } from "react";
import { getCat } from "../constants";
import { CheckIcon, TrashIcon, PenIcon } from "./Icons";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const c = getCat(todo.category);

  const commit = () => {
    const t = editText.trim();
    if (t) onEdit(todo.id, t);
    setEditing(false);
  };

  return (
    <div className="todo-item">
      {/* Checkbox */}
      <button
        className={`check-ring ${todo.done ? "done" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle complete"
      >
        {todo.done && <CheckIcon />}
      </button>

      {/* Category strip */}
      <span className="cat-strip" style={{ background: c.color + "99" }} />

      {/* Text / Edit input */}
      {editing ? (
        <input
          autoFocus
          className="edit-inp"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          onBlur={commit}
        />
      ) : (
        <span className={`item-text ${todo.done ? "done" : ""}`}>{todo.text}</span>
      )}

      {/* Actions */}
      {!editing && (
        <div className="item-actions">
          <button className="icon-btn edit" onClick={() => { setEditing(true); setEditText(todo.text); }} aria-label="Edit">
            <PenIcon />
          </button>
          <button className="icon-btn del" onClick={() => onDelete(todo.id)} aria-label="Delete">
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
}
