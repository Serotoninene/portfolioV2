import { useRef } from "react";

export const useCustomScroll = () => {
  const scroll = useRef(0);

  return { scroll: scroll.current };
};
