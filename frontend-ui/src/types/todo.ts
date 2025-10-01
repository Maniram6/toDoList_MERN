export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface CreateTodoData {
  text: string;
}

export interface UpdateTodoData {
  text?: string;
  completed?: boolean;
}

export interface ApiError {
  message: string;
}