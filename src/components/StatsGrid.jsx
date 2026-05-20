export default function StatsGrid({ total, activeCount, doneCount }) {
  const stats = [
    { label: "Total",  num: total,       color: "#a78bfa" },
    { label: "Active", num: activeCount, color: "#34d399" },
    { label: "Done",   num: doneCount,   color: "#fb923c" },
  ];

  return (
    <div className="stat-grid">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
