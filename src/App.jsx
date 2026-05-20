import React, { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';
import useTasks from './hooks/useTasks';
import './styles/App.css';

export default function App() {
  const [filter, setFilter] = useState('All');
  const { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted } = useTasks();

  const filtered = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    done: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="app">
      <Header />
      <ProgressBar stats={stats} />
      <TaskInput onAdd={addTask} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filtered}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      {stats.done > 0 && (
        <button className="clear-btn" onClick={clearCompleted}>
          Clear Completed ({stats.done})
        </button>
      )}
    </div>
  );
}
