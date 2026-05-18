import React from 'react';
import { FILTERS } from '../utils/constants';
import '../styles/FilterBar.css';

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      {FILTERS.map(f => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
