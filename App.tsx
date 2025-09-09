import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { EditButton } from './components/EditButton';
import { ImageDisplay } from './components/ImageDisplay';
import { HistorySidebar } from './components/HistorySidebar';
import { editImage } from './services/geminiService';
import { EditHistoryItem, HistorySidebarMode } from './types';

function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [textResponse, setTextResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<EditHistoryItem[]>([]);
  const [activeHistoryItemId, setActiveHistoryItemId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [historyMode, setHistoryMode] = useState<HistorySidebarMode>('float');
  const [historyWidth, setHistoryWidth] = useState<number>(400);

  // Effect to create object URL for uploaded image
  useEffect(() => {
    if (originalImageFile) {
      const url = URL.createObjectURL(originalImageFile);
      setOriginalImageUrl(url);
      // Clean up the object URL when the component unmounts or the file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setOriginalImageUrl(null);
    }
  }, [originalImageFile]);

  const handleImageUpload = (file: File) => {
    // Reset state when a new image is uploaded
    setOriginalImageFile(file);
    setEditedImageUrl(null);
    setPrompt('');
    setTextResponse(null);
    setError(null);
    setActiveHistoryItemId(null);
    // Do not clear history, user might want to see history of other images
    if (historyMode === 'float') {
      setIsHistoryOpen(false);
    }
  };

  const handleEdit = async () => {
    if (!originalImageFile || !prompt) return;

    setIsLoading(true);
    setError(null);
    if (historyMode === 'float') {
      setIsHistoryOpen(false);
    }

    try {
      const result = await editImage(originalImageFile, prompt);
      
      if (result.editedImage) {
        const newEditedUrl = `data:${result.editedImage.mimeType};base64,${result.editedImage.base64}`;
        setEditedImageUrl(newEditedUrl);
        setTextResponse(result.textResponse);

        // Add to history
        const newHistoryItem: EditHistoryItem = {
          id: crypto.randomUUID(),
          originalImageUrl: originalImageUrl!,
          imageUrl: newEditedUrl,
          prompt: prompt,
          textResponse: result.textResponse,
        };
        setHistory(prev => [newHistoryItem, ...prev]);
        setActiveHistoryItemId(newHistoryItem.id);

      } else {
         setError(result.textResponse || 'The AI did not return an image.');
      }

    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = useCallback((item: EditHistoryItem) => {
    // This assumes the original image for the history item is the currently loaded one.
    if (originalImageUrl !== item.originalImageUrl) {
      console.warn("Original image has changed. Restoring only the edited view.");
    }
    setEditedImageUrl(item.imageUrl);
    setPrompt(item.prompt);
    setTextResponse(item.textResponse);
    setActiveHistoryItemId(item.id);
    if (historyMode === 'float') {
      setIsHistoryOpen(false);
    }
  }, [originalImageUrl, historyMode]);

  const isEditDisabled = !originalImageFile || !prompt || isLoading;

  return (
    <div className="bg-neutral-950 text-white min-h-screen flex flex-col">
      <Header onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-start justify-center">
        <div className="w-full flex-1 flex flex-col gap-6 max-w-2xl">
          {!originalImageUrl ? (
            <div className="w-full h-full flex items-center justify-center pt-16">
                <ImageUploader onImageUpload={handleImageUpload} originalImageUrl={originalImageUrl}/>
            </div>
          ) : (
            <>
              <ImageDisplay 
                originalImageUrl={originalImageUrl}
                editedImageUrl={editedImageUrl}
                isLoading={isLoading}
                prompt={prompt}
                textResponse={textResponse}
              />
               {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span>{error}</span>
                </div>
              )}
              <div className="flex flex-col gap-4">
                <PromptInput 
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  disabled={isLoading}
                />
                <EditButton 
                  onClick={handleEdit}
                  disabled={isEditDisabled}
                  isLoading={isLoading}
                />
                 <div className="pt-2">
                   <ImageUploader onImageUpload={handleImageUpload} originalImageUrl={originalImageUrl}/>
                 </div>
              </div>
            </>
          )}
        </div>
      </main>
       <HistorySidebar 
        history={history}
        activeItemId={activeHistoryItemId}
        onSelectItem={handleSelectHistoryItem}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        mode={historyMode}
        onSetMode={setHistoryMode}
        width={historyWidth}
        onSetWidth={setHistoryWidth}
      />
    </div>
  );
}

export default App;