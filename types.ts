export interface EditHistoryItem {
  id: string;
  originalImageUrl: string;
  imageUrl: string; // The edited image url
  prompt: string;
  textResponse: string | null;
}

export type HistorySidebarMode = 'locked' | 'float';