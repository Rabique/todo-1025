
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import { EditIcon, DeleteIcon, CheckIcon } from './Icons';

interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText.trim());
    } else {
        // if user clears the text, delete the todo
        onDeleteTodo(todo.id);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center bg-slate-800 p-3 rounded-md border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300">
      <div className="flex-grow flex items-center gap-3">
        <button
          onClick={() => onToggleTodo(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
            todo.completed ? 'border-sky-500 bg-sky-500' : 'border-slate-600 hover:border-sky-500'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <CheckIcon />}
        </button>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent outline-none text-slate-100"
          />
        ) : (
          <span
            className={`cursor-pointer ${
              todo.completed ? 'text-slate-500 line-through' : 'text-slate-100'
            }`}
            onClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={handleEdit} className="text-slate-500 hover:text-sky-400 transition-colors" aria-label="Edit task">
          <EditIcon />
        </button>
        <button onClick={() => onDeleteTodo(todo.id)} className="text-slate-500 hover:text-red-500 transition-colors" aria-label="Delete task">
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};
