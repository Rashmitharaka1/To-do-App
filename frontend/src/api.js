// frontend/src/api.js
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export async function fetchTodos() {
const res = await fetch(`${BASE}/todos`);
return res.json();
}


export async function addTodo(title) {
const res = await fetch(`${BASE}/todos`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title })
});
return res.json();
}


export async function updateTodo(id, data) {
const res = await fetch(`${BASE}/todos/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});
return res.json();
}


export async function deleteTodo(id) {
const res = await fetch(`${BASE}/todos/${id}`, { method: 'DELETE' });
return res.json();
}