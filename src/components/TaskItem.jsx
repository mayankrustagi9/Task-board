import React, { useState } from 'react';
import { CATEGORY_COLORS } from '../utils/constants';
import '../styles/TaskItem.css';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim()) onEdit(task.id, editText.trim());
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') { setEditText(task.text); setEditing(false); }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {editing ? (
        <input
          className="edit-input"
          value={editText}
          autoFocus
          onChange={e => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="task-text">{task.text}</span>
      )}

      <span
        className="category-badge"
        style={{ backgroundColor: CATEGORY_COLORS[task.category] }}
      >
        {task.category}
      </span>

      <div className="task-actions">
        <button
          className="icon-btn edit"
          title="Edit"
          onClick={() => setEditing(true)}
        >✏️</button>
        <button
          className="icon-btn delete"
          title="Delete"
          onClick={() => onDelete(task.id)}
        >🗑️</button>
      </div>
    </li>
  );
}
