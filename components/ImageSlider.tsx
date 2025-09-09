import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ImageSliderProps {
    originalImageUrl: string;
    editedImageUrl: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ originalImageUrl, editedImageUrl }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = useCallback((clientX: number) => {
        if (!isDragging.current || !imageContainerRef.current) return;
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
    };

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
    }, []);

    const handleTouchEnd = useCallback(() => {
        isDragging.current = false;
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        handleMove(e.clientX);
    }, [handleMove]);
    
    const handleTouchMove = useCallback((e: TouchEvent) => {
        handleMove(e.touches[0].clientX);
    }, [handleMove]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    return (
        <div 
            ref={imageContainerRef}
            className="w-full h-full relative overflow-hidden select-none cursor-ew-resize"
            onMouseUp={handleMouseUp}
            onTouchEnd={handleTouchEnd}
        >
            <img 
                src={originalImageUrl}
                alt="Original"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
            />
            <div 
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={editedImageUrl}
                    alt="Edited"
                    className="w-full h-full object-contain"
                />
            </div>
            <div 
                className="absolute top-0 h-full w-1 bg-fuchsia-500/70 cursor-ew-resize pointer-events-none"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                <div 
                    className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 bg-fuchsia-500 rounded-full border-2 border-white/80 shadow-lg flex items-center justify-center"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{ pointerEvents: 'auto' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
