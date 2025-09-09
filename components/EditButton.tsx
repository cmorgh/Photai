import React from 'react';

interface EditButtonProps {
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
}

const LoadingSpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const WandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 2.24 14.135 2.24 16.182a4.5 4.5 0 009 0c0-2.047-1.5-4.336-2.76-5.592l.893-.892 5.43-1.357a.997.997 0 00.042-.01L17 3.22V2a1 1 0 00-2 0v1.185a.997.997 0 00-.042.01L10.544 5.43l-.892-.893a4.5 4.5 0 00-6.364-6.364L1 3.22V2a1 1 0 00-1-1H0V1h3zM6.5 4.5c0 .276.224.5.5.5s.5-.224.5-.5-.224-.5-.5-.5-.5.224-.5.5zM9 10.5c0 .276.224.5.5.5s.5-.224.5-.5-.224-.5-.5-.5-.5.224-.5.5z" />
    </svg>
);

export const EditButton: React.FC<EditButtonProps> = ({ onClick, disabled, isLoading }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 focus:ring-fuchsia-500 disabled:bg-neutral-600 disabled:cursor-not-allowed transition-all duration-200"
        >
            {isLoading ? (
                <>
                    <LoadingSpinnerIcon />
                    Editing...
                </>
            ) : (
                <>
                    <WandIcon />
                    Edit Photo
                </>
            )}
        </button>
    );
};