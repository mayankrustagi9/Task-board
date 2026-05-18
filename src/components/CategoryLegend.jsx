import { CATEGORIES } from "../constants/categories";

export default function CategoryLegend() {
  return (
    <div style={{ display: "flex", gap: 20, marginTop: 20, justifyContent: "center" }}>
      {CATEGORIES.map((c) => (
        <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "#2e2c45", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
