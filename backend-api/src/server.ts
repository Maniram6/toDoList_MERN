import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/toDos';
import { setupSwagger } from './config/swagger.js';

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Swagger Documentation
setupSwagger(app);

// Health check endpoint
app.get('/api/healthz', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});