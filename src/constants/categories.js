export const CATEGORIES = [
  { id: "personal", label: "Personal", color: "#a78bfa", bg: "#2d1f5e" },
  { id: "work",     label: "Work",     color: "#34d399", bg: "#064e3b" },
  { id: "urgent",   label: "Urgent",   color: "#fb923c", bg: "#7c2d12" },
];

export const getCat = (id) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
