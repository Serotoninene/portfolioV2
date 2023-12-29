import { Fragment, ReactElement, RefObject } from "react";
import { splitLetters } from ".";

export const splitWords = (
  phrase: string,
  ref?: RefObject<HTMLSpanElement[]>,
  overflow: "hidden" | "visible" = "hidden"
) => {
  const body: ReactElement[] = [];

  phrase.split(" ").forEach((word, i) => {
    const letters = splitLetters(word, ref);
    body.push(
      <Fragment key={word + i}>
        <p className={`inline-block overflow-${overflow}`}>{letters}</p>{" "}
      </Fragment>
    );
  });
  return body;
};
