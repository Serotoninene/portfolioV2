import { create } from "zustand";

type CursorStore = {
  cursorStyle: "default" | "pointer" | "none";
  setCursorStyle: (style: "default" | "pointer" | "none") => void;
};

export const useCursorStore = create<CursorStore>((set) => ({
  cursorStyle: "default",
  setCursorStyle: (style) => set({ cursorStyle: style }),
}));
