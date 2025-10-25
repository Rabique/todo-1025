
import React from 'react';
import { FilterStatus } from '../types';

interface TodoFiltersProps {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const filters: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: FilterStatus.ALL },
    { label: 'Active', value: FilterStatus.ACTIVE },
    { label: 'Completed', value: FilterStatus.COMPLETED },
];

export const TodoFilters: React.FC<TodoFiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 font-medium">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-3 py-1 rounded-md transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto ${
            filter === value
              ? 'text-sky-400'
              : 'text-slate-500 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
