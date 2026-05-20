# Priority Planner

A React + Vite todo app with a clean dark UI.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root component
├── constants.js          # Categories, initial data, helpers
├── components/
│   ├── Header.jsx        # Title + subtitle
│   ├── Stats.jsx         # Total / Active / Done cards
│   ├── ProgressBar.jsx   # Completion progress bar
│   ├── TaskInput.jsx     # Category selector + input field
│   ├── FilterTabs.jsx    # All / Active / Completed tabs
│   ├── TodoList.jsx      # List container + empty state + footer
│   ├── TodoItem.jsx      # Single task row with edit/delete
│   ├── Legend.jsx        # Category color legend
│   └── Icons.jsx         # SVG icons (Check, Trash, Pen)
└── styles/
    └── index.css         # All global styles
```
