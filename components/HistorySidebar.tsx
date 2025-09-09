import React from 'react';
import { EditHistoryItem, HistorySidebarMode } from '../types';

interface HistorySidebarProps {
  history: EditHistoryItem[];
  activeItemId: string | null;
  onSelectItem: (item: EditHistoryItem) => void;
  isOpen: boolean;
  onClose: () => void;
  mode: HistorySidebarMode;
  onSetMode: (mode: HistorySidebarMode) => void;
  width: number;
  onSetWidth: (width: number) => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const LockClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);

const LockOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm0 9a1 1 0 100-2 1 1 0 000 2z" />
        <path d="M9 4a3 3 0 013 3v2H6V7a3 3 0 013-3z" />
    </svg>
);


export const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, activeItemId, onSelectItem, isOpen, onClose, mode, onSetMode, width, onSetWidth }) => {
  
  const handleModeToggle = () => {
    onSetMode(mode === 'locked' ? 'float' : 'locked');
  };

  const modeTooltip = mode === 'locked' ? 'Switch to float mode (auto-closes)' : 'Switch to locked mode (stays open)';

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const newWidth = window.innerWidth - e.clientX;
    // Clamp width between min/max values
    const clampedWidth = Math.max(320, Math.min(newWidth, 800));
    onSetWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };


  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-neutral-950 border-l border-neutral-800 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out flex`}
      style={{
        width: `${width}px`,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <div
          onMouseDown={handleMouseDown}
          className="w-2 h-full cursor-col-resize flex-shrink-0 bg-neutral-800/20 hover:bg-fuchsia-500/30 transition-colors"
          title="Resize sidebar"
      />
      <div className="flex flex-col h-full flex-grow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 flex-shrink-0">
          <h2 className="text-xl font-semibold text-fuchsia-400">Edit History</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleModeToggle}
              className="p-2 rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              aria-label={modeTooltip}
              title={modeTooltip}
            >
              {mode === 'locked' ? <LockClosedIcon /> : <LockOpenIcon />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              aria-label="Close history"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="flex-grow flex items-center justify-center text-center text-neutral-500 p-6">
            <p>Your previous edits will appear here.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`w-full text-left p-3 rounded-lg transition-all border-2 ${
                  activeItemId === item.id
                    ? 'bg-fuchsia-500/20 border-fuchsia-500'
                    : 'bg-neutral-900/50 border-transparent hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={`Edit for prompt: ${item.prompt}`}
                    className="w-16 h-16 rounded-md object-cover bg-black flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-neutral-300 leading-snug line-clamp-3 font-medium">
                      {item.prompt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};