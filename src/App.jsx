import { useState, useEffect } from "react";
import { INITIAL_TODOS, uid } from "./constants";
import Header      from "./components/Header";
import Stats       from "./components/Stats";
import ProgressBar from "./components/ProgressBar";
import TaskInput   from "./components/TaskInput";
import FilterTabs  from "./components/FilterTabs";
import TodoList    from "./components/TodoList";
import Legend      from "./components/Legend";
import "./styles/index.css";

export default function App() {
  const [todos,   setTodos]   = useState(INITIAL_TODOS);
  const [input,   setInput]   = useState("");
  const [filter,  setFilter]  = useState("all");
  const [cat,     setCat]     = useState("personal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const handleAdd = (text) => {
    if (!text) return;
    setTodos((p) => [{ id: uid(), text, done: false, category: cat }, ...p]);
    setInput("");
  };

  const handleToggle = (id) => setTodos((p) => p.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const handleDelete = (id) => setTodos((p) => p.filter((t) => t.id !== id));
  const handleEdit   = (id, text) => setTodos((p) => p.map((t) => t.id === id ? { ...t, text } : t));
  const handleClear  = () => setTodos((p) => p.filter((t) => !t.done));

  const activeCount = todos.filter((t) => !t.done).length;
  const doneCount   = todos.filter((t) =>  t.done).length;
  const progress    = todos.length ? (doneCount / todos.length) * 100 : 0;

  return (
    <div className="app-root">
      <div className={`app-wrap ${mounted ? "in" : ""}`}>
        <Header      activeCount={activeCount} />
        <Stats       total={todos.length} active={activeCount} done={doneCount} />
        <ProgressBar progress={progress} />
        <TaskInput   input={input} setInput={setInput} cat={cat} setCat={setCat} onAdd={handleAdd} />
        <FilterTabs  filter={filter} setFilter={setFilter} />
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onClearCompleted={handleClear}
          doneCount={doneCount}
        />
        <Legend />
      </div>
    </div>
  );
}
