import React from "react";

export const usePageTransition = () => {
  const pageTransitionRef = React.useRef<HTMLDivElement>(null);

  return { pageTransitionRef };
};
