import { useState } from 'react';
import type { Todo } from '../types/todo';
import TodoItem from './toDoItem';

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onAddTodo, 
  onToggleTodo, 
  onEditTodo, 
  onDeleteTodo 
}) => {
  const [newTodoText, setNewTodoText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newTodoText.trim();
    if (text) {
      onAddTodo(text);
      setNewTodoText('');
    }
  };

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          autoFocus
        />
      </form>
      
      <ul className="todos">
        {todos.map(todo => (
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
  );
};

export default TodoList;