export const CATEGORIES = [
  { id: "personal", label: "Personal", color: "#a78bfa", bg: "#2d1f5e" },
  { id: "work",     label: "Work",     color: "#34d399", bg: "#064e3b" },
  { id: "urgent",   label: "Urgent",   color: "#fb923c", bg: "#7c2d12" },
];

let _id = Date.now();
export const uid = () => _id++;

export const INITIAL_TODOS = [
  { id: uid(), text: "Design the new landing page", done: false, category: "work"     },
  { id: uid(), text: "Buy groceries for the week",  done: false, category: "personal" },
  { id: uid(), text: "Fix critical production bug", done: false, category: "urgent"   },
  { id: uid(), text: "Read chapter 4 of Dune",      done: true,  category: "personal" },
];

export const getCat = (id) => CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
