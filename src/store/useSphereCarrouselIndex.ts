import { create } from "zustand";

type SphereCarrouselIndex = {
  index: number;
  setIndex: (index: number) => void;
};

export const useSphereCarrouselIndex = create<SphereCarrouselIndex>((set) => ({
  index: 0,
  setIndex: (i) => set({ index: i }),
}));
