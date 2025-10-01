import type { FilterType } from '../types/todo';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ 
  currentFilter, 
  onFilterChange, 
  onClearCompleted, 
  hasCompleted 
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="todo-filter">
      <div className="filters">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${currentFilter === key ? 'selected' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </div>
      
      {hasCompleted && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
};