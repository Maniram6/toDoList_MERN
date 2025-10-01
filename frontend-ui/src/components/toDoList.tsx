import { useState } from 'react';
import type { Todo } from '../types/todo';
import {TodoItem} from './toDoItem';

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string,category:string) => void;
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onAddTodo, 
  onToggleTodo, 
  onEditTodo, 
  onDeleteTodo 
}) => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newTodoText.trim();
    const category = categoryText.trim();
    if (text) {
      onAddTodo(text, category);
      setNewTodoText('');
      setCategoryText('')
    }
  };

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          className="category-input"
          placeholder="Set Category"
          value={categoryText}
          onChange={(e) => setCategoryText(e.target.value)}
        />
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          autoFocus
        />
        <button type="submit" style={{ display: 'none' }}>Submit</button>
      </form>

      <div className='todos-category'>
        {Object.entries(
          todos.reduce((acc: { [key: string]: typeof todos }, todo) => {
            const category = todo.category || 'Uncategorized';
            if (!acc[category]) acc[category] = [];
            acc[category].push(todo);
            return acc;
          }, {})
        ).map(([category, categoryTodos]) => (
          <div key={category}>
            <h1>{category}</h1>
            <ul className="todos">
              {categoryTodos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={() => onToggleTodo(todo._id)}
                  onEdit={(newText) => onEditTodo(todo._id, newText)}
                  onDelete={() => onDeleteTodo(todo._id)}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
};
