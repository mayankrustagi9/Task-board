const FILTERS = ["all", "active", "completed"];

export default function FilterTabs({ filter, setFilter }) {
  return (
    <div className="filter-row">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`f-btn ${filter === f ? "on" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
