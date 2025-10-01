import express, { Request, Response } from 'express';
import Todo from '../models/toDo';
import { CreateTodoRequest, UpdateTodoRequest } from '../types/express/index.js';

const router = express.Router();

// GET all todos
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
});

// GET single todo
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
});

// CREATE new todo
router.post('/', async (req: Request<{}, {}, CreateTodoRequest>, res: Response) => {
  try {
    const { text, category } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Todo text is required' });
    }

    if (!category || category.trim() === '') {
      return res.status(400).json({ message: 'category is required' });
    }

    const todo = new Todo({
      text: text.trim(),
      category: category.trim()
    });
    
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
});

// UPDATE todo
router.put('/:id', async (req: Request<{ id: string }, {}, UpdateTodoRequest>, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(400).json({ message: errorMessage });
  }
});

// DELETE todo
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
});

// DELETE all completed todos
router.delete('/', async (req: Request, res: Response) => {
  try {
    await Todo.deleteMany({ completed: true });
    res.json({ message: 'Completed todos cleared successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ message: errorMessage });
  }
});

export default router;