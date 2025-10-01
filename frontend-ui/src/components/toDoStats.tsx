import type { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todo-stats">
      <span className="items-left">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
    </div>
  );
};

export default TodoStats;