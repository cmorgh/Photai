import React, { useState } from 'react';
import { ImageSlider } from './ImageSlider';
import { ToggleView } from './ToggleView';

interface ImageTabsProps {
    originalImageUrl: string;
    editedImageUrl: string | null;
    prompt: string;
    textResponse: string | null;
}

type Tab = 'view' | 'compare';

export const ImageTabs: React.FC<ImageTabsProps> = ({ originalImageUrl, editedImageUrl, prompt, textResponse }) => {
    const [activeTab, setActiveTab] = useState<Tab>('view');

    const renderContent = () => {
        if (activeTab === 'compare') {
            if (editedImageUrl) {
                return (
                    <ImageSlider 
                        originalImageUrl={originalImageUrl}
                        editedImageUrl={editedImageUrl}
                    />
                );
            }
            // Fallback for compare tab if no edited image exists
            return (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                    <p>An edited image is needed to use the compare slider.</p>
                </div>
            );
        }

        // Default to 'view' tab
        return (
            <ToggleView
                originalImageUrl={originalImageUrl}
                editedImageUrl={editedImageUrl}
                prompt={prompt}
                textResponse={textResponse}
            />
        );
    };

    const TabButton: React.FC<{ tab: Tab, label: string, disabled?: boolean }> = ({ tab, label, disabled = false }) => (
        <button
            onClick={() => !disabled && setActiveTab(tab)}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab 
                ? 'bg-fuchsia-600 text-white' 
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {label}
        </button>
    );

    return (
        <div className="w-full h-full bg-neutral-900 rounded-lg flex flex-col border border-neutral-800 overflow-hidden">
            <div className="flex-shrink-0 bg-neutral-950/70 border-b border-neutral-800 p-2 flex items-center space-x-2">
                <TabButton tab="view" label="View" />
                <TabButton tab="compare" label="Compare" disabled={!editedImageUrl} />
            </div>
            <div className="flex-grow relative flex items-center justify-center p-2">
                {renderContent()}
            </div>
        </div>
    );
};