import { getCat } from "../constants/categories";
import { CheckIcon, TrashIcon, PenIcon } from "./Icons";

export default function TodoItem({ todo, editId, editTxt, setEditTxt, onToggle, onRemove, onEditStart, onEditCommit, onEditCancel }) {
  const c = getCat(todo.category);

  return (
    <div className="todo-item">
      <button
        className={`check-ring ${todo.done ? "done" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label="Toggle"
      >
        {todo.done && <CheckIcon />}
      </button>

      <span className="cat-strip" style={{ background: c.color + "99" }} />

      {editId === todo.id ? (
        <input
          autoFocus
          className="edit-inp"
          value={editTxt}
          onChange={(e) => setEditTxt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")  onEditCommit(todo.id);
            if (e.key === "Escape") onEditCancel();
          }}
          onBlur={() => onEditCommit(todo.id)}
        />
      ) : (
        <span className={`item-text ${todo.done ? "done" : ""}`}>{todo.text}</span>
      )}

      {editId !== todo.id && (
        <div className="item-actions">
          <button className="icon-btn edit" onClick={() => onEditStart(todo.id, todo.text)} aria-label="Edit">
            <PenIcon />
          </button>
          <button className="icon-btn del" onClick={() => onRemove(todo.id)} aria-label="Delete">
            <TrashIcon />
          </button>
        </div>
      )}
    </div>
  );
}
