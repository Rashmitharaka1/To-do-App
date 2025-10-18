import React, { useEffect, useState } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './api';
import TodoList from './components/TodoList';
import { FaPlus } from 'react-icons/fa'; // add icon

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchTodos();
    setTodos(data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const saved = await addTodo(title.trim());
    setTodos(prev => [saved, ...prev]);
    setTitle('');
  }

  async function toggle(todo) {
    const updated = await updateTodo(todo._id, { completed: !todo.completed });
    setTodos(prev => prev.map(t => (t._id === updated._id ? updated : t)));
  }

  async function remove(id) {
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t._id !== id));
  }

  return (
    <div
      style={{
        maxWidth: 450,
        margin: '2rem auto',
        padding: '1.5rem',
        color: '#ffffffff',
        fontFamily: 'Arial, sans-serif',
        borderRadius: 12,
        background: 'linear-gradient(180deg, #574ed8, #2e279d)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>📝 To-Do List</h1>

      <form
        onSubmit={handleAdd}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a new task..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            border: 'none',
            fontSize: 16,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#22c55e',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: 15,
            width: '100%',
          }}
        >
          <FaPlus /> Add Task
        </button>
      </form>

      <div style={{ marginTop: '1.5rem' }}>
        <TodoList todos={todos} onToggle={toggle} onDelete={remove} />
      </div>
    </div>
  );
}
