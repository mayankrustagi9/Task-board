import React, { useState } from 'react';
import { CATEGORIES } from '../utils/constants';
import '../styles/TaskInput.css';

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), category);
    setText('');
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
