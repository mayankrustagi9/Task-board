let _id = Date.now();
export const uid = () => _id++;

export const INITIAL_TODOS = [
  { id: uid(), text: "Design the new landing page",  done: false, category: "work"     },
  { id: uid(), text: "Buy groceries for the week",   done: false, category: "personal" },
  { id: uid(), text: "Fix critical production bug",  done: false, category: "urgent"   },
  { id: uid(), text: "Read chapter 4 of Dune",       done: true,  category: "personal" },
];
