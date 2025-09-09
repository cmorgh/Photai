import React from 'react';
import { ImageTabs } from './ImageTabs';

interface ImageDisplayProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  isLoading: boolean;
  prompt: string;
  textResponse: string | null;
}

const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
        <svg className="animate-spin h-10 w-10 text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-neutral-300 text-lg">Your edit is in progress...</p>
        <p className="text-neutral-500 text-sm">This can take a few moments.</p>
    </div>
);

const Placeholder = () => (
    <div className="w-full aspect-square bg-neutral-900 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-neutral-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.03 3.97l1.414 1.414A9 9 0 0112 3v1.5a7.5 7.5 0 00-7.5 7.5H3a9 9 0 01.03-2.03zM20.03 20.03l-1.414-1.414A9 9 0 0112 21v-1.5a7.5 7.5 0 007.5-7.5H21a9 9 0 01-1.97 5.03z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h1.5a7.5 7.5 0 007.5 7.5V21a9 9 0 01-5.03-1.97L3 12zm18 0h-1.5a7.5 7.5 0 00-7.5-7.5V3a9 9 0 015.03 1.97L21 12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a1 1 0 100-2 1 1 0 000 2zM4 12a1 1 0 10-2 0 1 1 0 002 0zm16 0a1 1 0 10-2 0 1 1 0 002 0zm-8 8a1 1 0 100-2 1 1 0 000 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 10-7.072 7.072 5 5 0 007.072-7.072z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        <p className="mt-4 text-neutral-600 font-medium">Your edited image will appear here.</p>
        <p className="text-neutral-700 text-sm">Upload an image and write a prompt to get started.</p>
    </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImageUrl, editedImageUrl, isLoading, prompt, textResponse }) => {
  if (!originalImageUrl) {
    return <Placeholder />;
  }

  return (
    <div className="relative w-full aspect-square">
        {isLoading && <LoadingOverlay />}
        <ImageTabs 
            originalImageUrl={originalImageUrl}
            editedImageUrl={editedImageUrl}
            prompt={prompt}
            textResponse={textResponse}
        />
    </div>
  );
};