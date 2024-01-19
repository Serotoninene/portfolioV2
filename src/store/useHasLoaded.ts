import { create } from "zustand";

type HasLoadedStore = {
  hasLoaded: boolean;
  setHasLoaded: (hasLoaded: boolean) => void;
};

export const useHasLoadedStore = create<HasLoadedStore>((set) => ({
  hasLoaded: false,
  setHasLoaded: (hasLoaded) => set({ hasLoaded }),
}));
