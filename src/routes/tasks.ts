import express, { Request, Response } from 'express';
import Task from '../models/Task';
import verifyToken from '../middleware';

const router = express.Router();

// Middleware to verify token
router.use(verifyToken);

// Create a new task
router.post('/sendtask', async (req: Request, res: Response) => {
  const { title, description, status, dueDate, priority } = req.body;
  const userId = req.userId;  // User ID from token

  try {
    const newTask = new Task({ title, description, status, dueDate, priority, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Task creation failed' });
  }
});

// Get all tasks
router.get('/alltasks', async (req: Request, res: Response) => {
  const userId = req.userId;  // User ID from token

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve tasks' });
  }
});

// Get a task by ID
router.get('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const userId = req.userId;  // User ID from token

  try {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve task' });
  }
});

// Update a task
router.put('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status, dueDate, priority } = req.body;
  const userId = req.userId;  // User ID from token

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status, dueDate, priority },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:taskId', async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const userId = req.userId;  // User ID from token

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
});

export default router;
