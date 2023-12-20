import { useEffect, useRef } from "react";

export const useCustomScroll = () => {
  const scroll = useRef(0);

  useEffect(() => {
    document.addEventListener("scroll", trackScroll);

    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return { scroll: scroll.current };
};
