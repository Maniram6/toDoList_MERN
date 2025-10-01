import mongoose, { Schema, Document } from 'mongoose';
import { ITodo } from '../types/express/index.js';

const todoSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    // required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ITodo>('Todo', todoSchema);