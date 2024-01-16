import { useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

export function useMediaQuery(query: number) {
  const [match, setMatch] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;

    if (query > width) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [width, query]);

  return match;
}
