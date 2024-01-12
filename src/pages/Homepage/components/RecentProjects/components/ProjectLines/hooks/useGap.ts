import React from "react";
import { useWindowSize } from "../../../../../../../hooks";

export const useGap = () => {
  const { width } = useWindowSize();

  let GAP = 40;

  if (width && width < 768) {
    GAP = 0;
  } else if (width && width >= 768 && width < 1280) {
    GAP = 40;
  } else if (width && width >= 1280) {
    GAP = 112;
  }

  return GAP;
};
