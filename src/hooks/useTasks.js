import { useState } from 'react';
import { generateId } from '../utils/helpers';

export default function useTasks() {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Buy groceries', category: 'Personal', completed: false },
    { id: '2', text: 'Finish project report', category: 'Work', completed: false },
    { id: '3', text: 'Pay electricity bill', category: 'Urgent', completed: true },
  ]);

  const addTask = (text, category) => {
    setTasks(prev => [...prev, { id: generateId(), text, category, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed));
  };

  return { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted };
}
