
import React from 'react';
import { FilterStatus } from '../types';
import { TodoFilters } from './TodoFilters';

interface FooterProps {
  activeCount: number;
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
  totalTodos: number;
}

export const Footer: React.FC<FooterProps> = ({ activeCount, filter, onFilterChange, onClearCompleted, totalTodos }) => {
    const hasCompletedTodos = totalTodos > activeCount;

    if (totalTodos === 0) {
        return null;
    }

  return (
    <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-4">
      <span>
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </span>
      <div className="hidden sm:block">
        <TodoFilters filter={filter} onFilterChange={onFilterChange} />
      </div>
      <button
        onClick={onClearCompleted}
        className={`hover:text-white transition-colors duration-300 ${!hasCompletedTodos ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
       <div className="sm:hidden w-full bg-slate-900/50 p-2 rounded-md">
        <TodoFilters filter={filter} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
};
