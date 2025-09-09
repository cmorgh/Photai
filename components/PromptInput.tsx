import React from 'react';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange, disabled }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-neutral-300 mb-2">
        Describe your edit
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={disabled}
          placeholder="e.g., 'add a cat wearing a party hat', 'make the sky look like a galaxy', 'turn this into a watercolor painting'"
          className="block w-full rounded-md bg-neutral-900 border-neutral-700 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm text-neutral-200 placeholder:text-neutral-600 resize-none disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
        />
      </div>
    </div>
  );
};