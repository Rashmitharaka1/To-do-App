// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


// GET all
router.get('/', async (req, res) => {
try {
const todos = await Todo.find().sort({ createdAt: -1 });
res.json(todos);
} catch (err) {
res.status(500).json({ error: err.message });
}
});


// POST create
router.post('/', async (req, res) => {
try {
const { title } = req.body;
const todo = new Todo({ title });
const saved = await todo.save();
res.status(201).json(saved);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// PUT toggle / update
router.put('/:id', async (req, res) => {
try {
const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
} catch (err) {
res.status(400).json({ error: err.message });
}
});


// DELETE
router.delete('/:id', async (req, res) => {
try {
await Todo.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) {
res.status(400).json({ error: err.message });
}
});


module.exports = router;