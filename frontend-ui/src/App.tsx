import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/toDoList';
import TodoFilter from './components/toDoFilter';
import TodoStats from './components/toDoStats';
import { getTodos, createTodo, updateTodo, deleteTodo, clearCompleted } from './api/toDoApi';
import type { Todo, FilterType } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch todos';
      setError(errorMessage);
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string): Promise<void> => {
    try {
      setError(null);
      const newTodo = await createTodo(text);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create todo';
      setError(errorMessage);
      console.error('Error creating todo:', error);
    }
  };

  const toggleTodo = async (id: string): Promise<void> => {
    try {
      setError(null);
      const todo = todos.find(t => t._id === id);
      if (!todo) return;
      
      const updatedTodo = await updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === id ? updatedTodo : t));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update todo';
      setError(errorMessage);
      console.error('Error updating todo:', error);
    }
  };

  const editTodo = async (id: string, newText: string): Promise<void> => {
    try {
      setError(null);
      const updatedTodo = await updateTodo(id, { text: newText });
      setTodos(todos.map(t => t._id === id ? updatedTodo : t));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update todo';
      setError(errorMessage);
      console.error('Error updating todo:', error);
    }
  };

  const removeTodo = async (id: string): Promise<void> => {
    try {
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete todo';
      setError(errorMessage);
      console.error('Error deleting todo:', error);
    }
  };

  const handleClearCompleted = async (): Promise<void> => {
    try {
      setError(null);
      await clearCompleted();
      setTodos(todos.filter(t => !t.completed));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear completed todos';
      setError(errorMessage);
      console.error('Error clearing completed todos:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>todos</h1>
      </header>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
      
      <main className="main">
        <TodoList 
          todos={filteredTodos}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onEditTodo={editTodo}
          onDeleteTodo={removeTodo}
        />
        
        {todos.length > 0 && (
          <>
            <TodoStats todos={todos} />
            <TodoFilter 
              currentFilter={filter}
              onFilterChange={setFilter}
              onClearCompleted={handleClearCompleted}
              hasCompleted={todos.some(todo => todo.completed)}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;