export default function Header({ activeCount }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{
        fontSize: 12, fontWeight: 600, letterSpacing: "0.15em",
        textTransform: "uppercase", color: "#4a4860", marginBottom: 8,
      }}>
        My Workspace
      </p>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 40, fontWeight: 700, color: "#e8e4ff",
        lineHeight: 1.1, marginBottom: 6,
      }}>
        Priority Planner
      </h1>
      <p style={{ fontSize: 14, color: "#3a3860", fontWeight: 400 }}>
        {activeCount === 0
          ? "Everything done — great work!"
          : `${activeCount} task${activeCount !== 1 ? "s" : ""} left to tackle`}
      </p>
    </div>
  );
}
