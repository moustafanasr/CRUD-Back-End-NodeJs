import { Schema, model, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'completed';
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
