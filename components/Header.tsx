
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter bg-gradient-to-r from-sky-400 to-indigo-500 text-transparent bg-clip-text">
        Todo Pro
      </h1>
      <p className="text-slate-400 mt-2">What's your plan for today?</p>
    </header>
  );
};
