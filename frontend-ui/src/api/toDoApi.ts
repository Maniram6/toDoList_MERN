import axios from 'axios';
import type { Todo, CreateTodoData,UpdateTodoData } from '../types/todo';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>('/todos');
  return response.data;
};

export const createTodo = async (createBody: CreateTodoData): Promise<Todo> => {
  const response = await api.post<Todo>('/todos', createBody);
  return response.data;
};

export const updateTodo = async (id: string, updateBody: UpdateTodoData): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${id}`, updateBody);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/todos/${id}`);
  return response.data;
};

export const clearCompleted = async (): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>('/todos');
  return response.data;
};