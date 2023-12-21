import { ReactElement, RefObject } from "react";

export const splitLetters = (
  word: string,
  ref: RefObject<HTMLSpanElement[]>
) => {
  const letters: ReactElement[] = [];

  word.split("").forEach((letter, i) => {
    letters.push(
      <span
        ref={(el) => ref.current?.push(el as HTMLSpanElement)}
        key={letter + "-" + i}
        className={`inline-block `}
      >
        {letter}
      </span>
    );
  });
  return letters;
};
