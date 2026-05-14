import { useState, useRef, useEffect } from "react";

const CATEGORIES = [
  { id: "personal", label: "Personal", color: "#a78bfa", bg: "#2d1f5e" },
  { id: "work",     label: "Work",     color: "#34d399", bg: "#064e3b" },
  { id: "urgent",   label: "Urgent",   color: "#fb923c", bg: "#7c2d12" },
];

let _id = Date.now();
const uid = () => _id++;

const INITIAL = [
  { id: uid(), text: "Design the new landing page",  done: false, category: "work"     },
  { id: uid(), text: "Buy groceries for the week",   done: false, category: "personal" },
  { id: uid(), text: "Fix critical production bug",  done: false, category: "urgent"   },
  { id: uid(), text: "Read chapter 4 of Dune",       done: true,  category: "personal" },
];

const getCat = (id) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

function CheckIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #0c0c14; }

  .app-root {
    min-height: 100vh;
    background: #0c0c14;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 16px 80px;
    font-family: 'Outfit', sans-serif;
  }

  .app-wrap {
    width: 100%;
    max-width: 520px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .app-wrap.in { opacity: 1; transform: translateY(0); }

  /* ── Stats ── */
  .stat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 24px; }
  .stat-card {
    background: #13121f;
    border: 1px solid #1f1e30;
    border-radius: 16px;
    padding: 16px;
    text-align: center;
  }
  .stat-num   { font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
  .stat-label { font-size: 11px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: #4a4860; }

  /* ── Progress ── */
  .progress-wrap   { margin-bottom: 28px; }
  .progress-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .progress-label  { font-size: 12px; color: #4a4860; letter-spacing: .07em; text-transform: uppercase; font-weight: 500; }
  .progress-pct    { font-size: 12px; color: #a78bfa; font-weight: 600; }
  .progress-bar-bg { height: 6px; background: #1a1830; border-radius: 99px; overflow: hidden; }
  .progress-bar-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, #7c3aed, #a78bfa);
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
  }

  /* ── Input card ── */
  .input-card { background: #13121f; border: 1px solid #1f1e30; border-radius: 20px; padding: 20px; margin-bottom: 16px; }
  .cat-row    { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .cat-pill {
    padding: 5px 14px; border-radius: 99px; font-size: 12px; font-weight: 500;
    border: 1.5px solid #1f1e30; cursor: pointer; transition: all .18s;
    background: transparent; color: #4a4860; font-family: 'Outfit', sans-serif;
  }
  .cat-pill:hover { border-color: #3a3860; color: #999; }
  .cat-pill.sel   { font-weight: 600; }

  .input-row {
    display: flex; gap: 10px;
    background: #0c0c14; border: 1.5px solid #1f1e30; border-radius: 14px;
    padding: 4px 4px 4px 16px; align-items: center; transition: border-color .2s;
  }
  .input-row:focus-within { border-color: #a78bfa55; }
  .task-input {
    flex: 1; background: transparent; border: none; outline: none;
    font-family: 'Outfit', sans-serif; font-size: 14px; color: #e0ddf5; min-width: 0;
  }
  .task-input::placeholder { color: #2e2c45; }
  .add-btn {
    background: linear-gradient(135deg, #7c3aed, #a78bfa); border: none; border-radius: 10px;
    padding: 9px 20px; color: #fff; font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s;
    white-space: nowrap; letter-spacing: .03em;
  }
  .add-btn:hover  { opacity: .85; transform: translateY(-1px); }
  .add-btn:active { transform: translateY(0); opacity: 1; }

  /* ── Filters ── */
  .filter-row {
    display: flex; background: #13121f; border: 1px solid #1f1e30;
    border-radius: 14px; padding: 4px; gap: 2px; margin-bottom: 12px;
  }
  .f-btn {
    flex: 1; padding: 8px; border: none; background: transparent; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
    color: #3a3860; cursor: pointer; transition: all .18s;
  }
  .f-btn:hover { color: #7a78a0; }
  .f-btn.on    { background: #1e1c30; color: #c4bef5; }

  /* ── Todo list ── */
  .todo-list { background: #13121f; border: 1px solid #1f1e30; border-radius: 20px; overflow: hidden; }
  .todo-item {
    display: flex; align-items: center; gap: 12px; padding: 14px 18px;
    border-bottom: 1px solid #0f0e1a; transition: background .15s; position: relative;
  }
  .todo-item:last-child          { border-bottom: none; }
  .todo-item:hover               { background: #16152680; }
  .todo-item:hover .item-actions { opacity: 1; }

  .check-ring {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid #2a2840;
    background: transparent; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all .2s; padding: 0;
  }
  .check-ring:hover { border-color: #7c3aed; }
  .check-ring.done  { background: linear-gradient(135deg,#7c3aed,#a78bfa); border-color: transparent; }

  .cat-strip { width: 3px; height: 28px; border-radius: 99px; flex-shrink: 0; }

  .item-text {
    flex: 1; font-size: 14px; font-weight: 400; color: #c4bef5;
    transition: all .2s; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; min-width: 0;
  }
  .item-text.done { color: #2e2c45; text-decoration: line-through; }

  .item-actions { display: flex; gap: 4px; opacity: 0; transition: opacity .15s; flex-shrink: 0; }
  .icon-btn {
    background: transparent; border: none; cursor: pointer; padding: 6px;
    border-radius: 8px; transition: all .15s; display: flex;
    align-items: center; justify-content: center; color: #3a3860;
  }
  .icon-btn.edit:hover { color: #a78bfa; background: #a78bfa18; }
  .icon-btn.del:hover  { color: #fb7185; background: #fb718520; }

  .edit-inp {
    flex: 1; background: #0c0c14; border: 1.5px solid #a78bfa55;
    border-radius: 8px; padding: 5px 10px;
    font-family: 'Outfit', sans-serif; font-size: 14px; color: #e0ddf5;
    outline: none; min-width: 0;
  }

  .empty-state { padding: 60px 20px; text-align: center; }
  .empty-icon  { font-size: 36px; margin-bottom: 12px; color: #1f1e30; }
  .empty-text  { font-size: 14px; font-weight: 500; color: #2e2c45; letter-spacing: .03em; }

  .list-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 18px; border-top: 1px solid #0f0e1a; background: #0f0e1a;
  }
  .footer-txt { font-size: 12px; color: #2e2c45; font-weight: 400; letter-spacing: .05em; }
  .clear-btn {
    background: transparent; border: none; font-family: 'Outfit', sans-serif;
    font-size: 12px; color: #2e2c45; cursor: pointer; transition: color .15s;
    font-weight: 500;
  }
  .clear-btn:hover { color: #fb7185; }
`;

export default function App() {
  const [todos,   setTodos]   = useState(INITIAL);
  const [input,   setInput]   = useState("");
  const [filter,  setFilter]  = useState("all");
  const [cat,     setCat]     = useState("personal");
  const [editId,  setEditId]  = useState(null);
  const [editTxt, setEditTxt] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const add = () => {
    const t = input.trim();
    if (!t) return;
    setTodos((p) => [{ id: uid(), text: t, done: false, category: cat }, ...p]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggle     = (id) => setTodos((p) => p.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const remove     = (id) => setTodos((p) => p.filter((t) => t.id !== id));
  const commitEdit = (id) => {
    const t = editTxt.trim();
    if (t) setTodos((p) => p.map((item) => item.id === id ? { ...item, text: t } : item));
    setEditId(null);
  };

  const shown      = todos.filter((t) => filter === "active" ? !t.done : filter === "completed" ? t.done : true);
  const activeCount = todos.filter((t) => !t.done).length;
  const doneCount   = todos.filter((t) =>  t.done).length;
  const progress    = todos.length ? (doneCount / todos.length) * 100 : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="app-root">
        <div className={`app-wrap ${mounted ? "in" : ""}`}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a4860", marginBottom: 8 }}>
              My Workspace
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#e8e4ff", lineHeight: 1.1, marginBottom: 6 }}>
              Task Board
            </h1>
            <p style={{ fontSize: 14, color: "#3a3860" }}>
              {activeCount === 0 ? "Everything done — great work!" : `${activeCount} task${activeCount !== 1 ? "s" : ""} left to tackle`}
            </p>
          </div>

          {/* Stats */}
          <div className="stat-grid">
            {[
              { label: "Total",  num: todos.length, color: "#a78bfa" },
              { label: "Active", num: activeCount,  color: "#34d399" },
              { label: "Done",   num: doneCount,    color: "#fb923c" },
            ].map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="progress-wrap">
            <div className="progress-header">
              <span className="progress-label">Completion</span>
              <span className="progress-pct">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Input */}
          <div className="input-card">
            <div className="cat-row">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className={`cat-pill ${cat === c.id ? "sel" : ""}`}
                  style={cat === c.id ? { background: c.bg + "99", borderColor: c.color + "88", color: c.color } : {}}
                  onClick={() => setCat(c.id)}
                >
                  <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: cat === c.id ? c.color : "#2e2c45", marginRight: 7, verticalAlign: "middle" }} />
                  {c.label}
                </button>
              ))}
            </div>
            <div className="input-row">
              <input
                ref={inputRef}
                className="task-input"
                placeholder="What needs to be done?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && add()}
              />
              <button className="add-btn" onClick={add}>Add Task</button>
            </div>
          </div>

          {/* Filters */}
          <div className="filter-row">
            {["all", "active", "completed"].map((f) => (
              <button key={f} className={`f-btn ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="todo-list">
            {shown.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">{filter === "completed" ? "✓" : "○"}</div>
                <div className="empty-text">
                  {filter === "completed" ? "No completed tasks yet" : filter === "active" ? "No active tasks" : "Add your first task above"}
                </div>
              </div>
            ) : (
              <>
                {shown.map((todo) => {
                  const c = getCat(todo.category);
                  return (
                    <div key={todo.id} className="todo-item">
                      <button className={`check-ring ${todo.done ? "done" : ""}`} onClick={() => toggle(todo.id)} aria-label="Toggle">
                        {todo.done && <CheckIcon />}
                      </button>
                      <span className="cat-strip" style={{ background: c.color + "99" }} />
                      {editId === todo.id ? (
                        <input
                          autoFocus
                          className="edit-inp"
                          value={editTxt}
                          onChange={(e) => setEditTxt(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") commitEdit(todo.id); if (e.key === "Escape") setEditId(null); }}
                          onBlur={() => commitEdit(todo.id)}
                        />
                      ) : (
                        <span className={`item-text ${todo.done ? "done" : ""}`}>{todo.text}</span>
                      )}
                      {editId !== todo.id && (
                        <div className="item-actions">
                          <button className="icon-btn edit" onClick={() => { setEditId(todo.id); setEditTxt(todo.text); }} aria-label="Edit"><PenIcon /></button>
                          <button className="icon-btn del"  onClick={() => remove(todo.id)} aria-label="Delete"><TrashIcon /></button>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="list-footer">
                  <span className="footer-txt">{shown.length} task{shown.length !== 1 ? "s" : ""}</span>
                  {doneCount > 0 && (
                    <button className="clear-btn" onClick={() => setTodos((p) => p.filter((t) => !t.done))}>Clear completed</button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 20, marginTop: 20, justifyContent: "center" }}>
            {CATEGORIES.map((c) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: "#2e2c45", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
