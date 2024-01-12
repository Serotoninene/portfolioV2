import { create } from "zustand";

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ProjectMeshRect = {
  rect: Rect;
  setRect: (rect: Rect) => void;
};

export const useProjectMeshRect = create<ProjectMeshRect>((set) => ({
  rect: { x: 0, y: 0, width: 0, height: 0 },
  setRect: (rect) => set({ rect }),
}));
