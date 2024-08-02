import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 4000; // Changed from 3000 to 3001

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const MONGODB_URI = process.env.MONGODB_URI ||"mongodb+srv://CRUD-System:102030456@moustafa-nasr.jdwhgxk.mongodb.net/?retryWrites=true&w=majority&appName=Moustafa-Nasr";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}, Welcome to my project Moustafa M Nasr`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
