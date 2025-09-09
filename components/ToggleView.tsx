import React, { useState, useEffect } from 'react';

interface ToggleViewProps {
    originalImageUrl: string;
    editedImageUrl: string | null;
    prompt: string;
    textResponse: string | null;
}

const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


export const ToggleView: React.FC<ToggleViewProps> = ({ originalImageUrl, editedImageUrl, prompt, textResponse }) => {
    // Show original if there is no edited image yet.
    const [isShowingOriginal, setIsShowingOriginal] = useState(!editedImageUrl);
    
    // When the edited image changes (e.g., a new edit is made or history item selected),
    // default to showing the new edited image.
    useEffect(() => {
        setIsShowingOriginal(!editedImageUrl);
    }, [editedImageUrl]);

    const handleToggle = () => {
        if(editedImageUrl) { // Only allow toggle if there's an edited image
            setIsShowingOriginal(prev => !prev);
        }
    };

    const handleDownload = () => {
        if (!editedImageUrl) return;
        const link = document.createElement('a');
        link.href = editedImageUrl;
        const mimeType = editedImageUrl.split(';')[0].split(':')[1];
        const extension = mimeType.split('/')[1] || 'png';
        link.download = `ai-edited-image.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const imageUrlToShow = isShowingOriginal || !editedImageUrl ? originalImageUrl : editedImageUrl;
    const imageLabel = isShowingOriginal || !editedImageUrl ? 'Original' : 'Edited';
    const buttonLabel = isShowingOriginal ? 'Show Edited' : 'Show Original';
    const isDownloadDisabled = isShowingOriginal || !editedImageUrl;

    const hasInfo = prompt || textResponse;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-grow relative flex items-center justify-center">
                 <img 
                    src={imageUrlToShow} 
                    alt={imageLabel} 
                    className="max-w-full max-h-full object-contain"
                />
                <div className="absolute top-1 left-1 bg-black/50 text-white px-2 py-1 text-xs rounded-md backdrop-blur-sm">
                    {imageLabel}
                </div>
            </div>
            <div className="flex-shrink-0 mt-2 p-2 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={handleToggle}
                        disabled={!editedImageUrl}
                        className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-neutral-700 text-sm font-medium rounded-md text-neutral-300 bg-neutral-900 hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SwapIcon />
                        {buttonLabel}
                    </button>
                     <button
                        onClick={handleDownload}
                        disabled={isDownloadDisabled}
                        className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-neutral-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-fuchsia-500"
                    >
                        <DownloadIcon />
                        Download
                    </button>
                </div>
                {hasInfo && (
                    <div className="text-left text-xs text-neutral-400 w-full md:w-auto flex-grow md:text-right">
                        {prompt && <p className="truncate"><span className="font-bold text-neutral-200">Prompt:</span> {prompt}</p>}
                        {textResponse && <p className="truncate mt-1"><span className="font-bold text-neutral-200">AI:</span> {textResponse}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};