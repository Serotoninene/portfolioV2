import { create } from "zustand";

interface LoadingProgressState {
  progress: number;
  isLoading: boolean;
  setProgress: (itemsLoaded: number, itemsTotal: number) => void;
  setIsLoading: (loading: boolean) => void;
  resetProgress: () => void;
}

export const useLoadingProgress = create<LoadingProgressState>((set) => ({
  progress: 0,
  isLoading: true,

  setProgress: (itemsLoaded: number, itemsTotal: number) => {
    if (itemsTotal === 0) {
      set({ progress: 0 });
      return;
    }

    // Convert to 0-100 percentage
    const percentage = Math.round((itemsLoaded / itemsTotal) * 100);
    set({ progress: percentage });

    // If we've loaded everything, set loading to false
    if (itemsLoaded === itemsTotal) {
      set({ isLoading: false });
    }
  },

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  resetProgress: () => set({ progress: 0, isLoading: true }),
}));
