import React from 'react';
import '../styles/ProgressBar.css';

export default function ProgressBar({ stats }) {
  const percent = stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  return (
    <div className="progress-section">
      <div className="stats">
        <span>Total: <strong>{stats.total}</strong></span>
        <span>Active: <strong>{stats.active}</strong></span>
        <span>Done: <strong>{stats.done}</strong></span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-label">{percent}% complete</p>
    </div>
  );
}
