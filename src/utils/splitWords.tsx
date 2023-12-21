import { ReactElement, RefObject } from "react";
import { splitLetters } from ".";

export const splitWords = (
  phrase: string,
  ref: RefObject<HTMLSpanElement[]>
) => {
  const body: ReactElement[] = [];

  phrase.split(" ").forEach((word, i) => {
    const letters = splitLetters(word, ref);
    body.push(
      <>
        <p key={word + "_" + i} className="inline-block">
          {letters}
        </p>{" "}
      </>
    );
  });
  return body;
};
