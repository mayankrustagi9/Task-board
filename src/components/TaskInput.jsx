import { useRef } from "react";
import { CATEGORIES } from "../constants";

export default function TaskInput({ input, setInput, cat, setCat, onAdd }) {
  const inputRef = useRef(null);

  const handleAdd = () => {
    onAdd(input.trim());
    inputRef.current?.focus();
  };

  return (
    <div className="input-card">
      {/* Category selector */}
      <div className="cat-row">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`cat-pill ${cat === c.id ? "sel" : ""}`}
            style={cat === c.id ? { background: c.bg + "99", borderColor: c.color + "88", color: c.color } : {}}
            onClick={() => setCat(c.id)}
          >
            <span style={{
              display: "inline-block", width: 7, height: 7, borderRadius: "50%",
              background: cat === c.id ? c.color : "#2e2c45",
              marginRight: 7, verticalAlign: "middle",
            }} />
            {c.label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="input-row">
        <input
          ref={inputRef}
          className="task-input"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="add-btn" onClick={handleAdd}>Add Task</button>
      </div>
    </div>
  );
}
