import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import { config } from 'dotenv';

config();  // Load environment variables from .env file

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://CRUD-System:102030456@moustafa-nasr.jdwhgxk.mongodb.net/?retryWrites=true&w=majority&appName=Moustafa-Nasr")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000, Welcome to my project Moustafa M Nasr');
});
