import React from 'react';

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface HeaderProps {
    onToggleHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleHistory }) => {
  return (
    <header className="bg-black/60 backdrop-blur-sm border-b border-neutral-800/50 sticky top-0 z-20 flex-shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <CameraIcon />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-500 to-purple-600 text-transparent bg-clip-text">
              AI Photo Editor
            </h1>
        </div>
        <button
            onClick={onToggleHistory}
            className="inline-flex items-center px-4 py-2 border border-neutral-700 text-sm font-medium rounded-md text-neutral-300 bg-neutral-900 hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-fuchsia-500"
            aria-label="Toggle edit history"
        >
            <HistoryIcon />
            History
        </button>
      </div>
    </header>
  );
};