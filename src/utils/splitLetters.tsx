import { ReactElement, RefObject } from "react";
import { v4 as uuidv4 } from "uuid";

export const splitLetters = (
  word: string,
  ref?: RefObject<HTMLSpanElement[]>
) => {
  const letters: ReactElement[] = [];

  word.split("").forEach((letter, i) => {
    letters.push(
      <span
        ref={(el) => ref && ref.current?.push(el as HTMLSpanElement)}
        key={uuidv4()}
        className={`inline-block`}
      >
        {letter}
      </span>
    );
  });
  return letters;
};
