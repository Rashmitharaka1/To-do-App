import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p style={{ textAlign: 'center' }}>No tasks yet 😴</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map(todo => (
        <li
          key={todo._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff22',
            marginBottom: '10px',
            padding: '10px 12px',
            borderRadius: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo)}
              style={{ width: 18, height: 18 }}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#ccc' : '#fff',
                fontSize: 16,
              }}
            >
              {todo.title}
            </span>
          </div>

          <button
            onClick={() => onDelete(todo._id)}
            style={{
              backgroundColor: '#ef4444',
              border: 'none',
              color: 'white',
              borderRadius: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 8px',
            }}
          >
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
  );
}
