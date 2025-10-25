
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterStatus } from './types';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage", error);
    }
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  }, []);
  
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);


  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterStatus.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterStatus.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center pt-8 sm:pt-16 px-4">
      <div className="w-full max-w-xl">
        <Header />
        <main className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-2xl shadow-slate-950/50 p-4 sm:p-6 mt-6 border border-slate-700">
          <TodoInput onAddTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
          <Footer
            activeCount={activeCount}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            totalTodos={todos.length}
          />
        </main>
        <p className="text-center text-slate-500 mt-8 text-sm">
            Drag and drop to reorder list (coming soon!)
        </p>
      </div>
    </div>
  );
};

export default App;
