import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImageUrl: string | null;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const ReplaceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImageUrl }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    if (rejectedFiles && rejectedFiles.length > 0) {
        setError('Please upload a valid image file (PNG, JPG, WEBP).');
        return;
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10 MB
  });
  
  if (originalImageUrl) {
    return (
        <div className="text-center">
            <button
                onClick={open}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-neutral-700 text-sm font-medium rounded-md text-neutral-300 bg-neutral-900 hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-fuchsia-500"
            >
                <ReplaceIcon />
                Replace Image
            </button>
            <input {...getInputProps()} className="hidden" />
        </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <UploadIcon />
        {isDragActive ? (
          <p className="mt-4 text-lg font-semibold text-fuchsia-400">Drop the image here ...</p>
        ) : (
          <>
            <p className="mt-4 text-lg font-semibold text-neutral-300">Drag & drop an image here</p>
            <p className="text-neutral-500">or</p>
            <button type="button" className="font-semibold text-fuchsia-500 hover:text-fuchsia-400 focus:outline-none">
              Click to upload
            </button>
          </>
        )}
        <p className="mt-2 text-xs text-neutral-600">PNG, JPG, WEBP up to 10MB</p>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};