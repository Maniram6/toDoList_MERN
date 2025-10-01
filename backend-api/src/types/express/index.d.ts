import { Document } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}