import TodoItem from "./TodoItem";

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit, onClearCompleted, doneCount }) {
  const shown = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );

  return (
    <div className="todo-list">
      {shown.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{filter === "completed" ? "✓" : "○"}</div>
          <div className="empty-text">
            {filter === "completed"
              ? "No completed tasks yet"
              : filter === "active"
              ? "No active tasks"
              : "Add your first task above"}
          </div>
        </div>
      ) : (
        <>
          {shown.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          <div className="list-footer">
            <span className="footer-txt">{shown.length} task{shown.length !== 1 ? "s" : ""}</span>
            {doneCount > 0 && (
              <button className="clear-btn" onClick={onClearCompleted}>
                Clear completed
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
