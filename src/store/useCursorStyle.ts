import { create } from "zustand";

type CursorStore = {
  cursorStyle: string;
  setCursorStyle: (style: string) => void;
};

export const useCursorStore = create<CursorStore>((set) => ({
  cursorStyle: "default",
  setCursorStyle: (style) => set({ cursorStyle: style }),
}));
