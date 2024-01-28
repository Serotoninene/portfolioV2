import { create } from "zustand";

type CursorStore = {
  cursorStyle: "default" | "pointer" | "text" | "none";
  cursorText: "play" | "pause" | "";
  setCursorStyle: (style: "default" | "pointer" | "none" | "text") => void;
  setCursorText: (text: "play" | "pause" | "") => void;
};

export const useCursorStore = create<CursorStore>((set) => ({
  cursorStyle: "default",
  cursorText: "",
  setCursorStyle: (style) => set({ cursorStyle: style }),
  setCursorText: (text) => set({ cursorText: text }),
}));
