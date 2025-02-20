import { UseCanvas, useScrollRig } from "@14islands/r3f-scroll-rig";
import { RefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Experiment } from "../../index";
import { Scene } from "./Scene";
import { useCursorStore } from "../../../../store/useCursorStyle";

const getGridPosition = (idx: number) => {
  let gridColumn = "";
  let marginTop = "";

  if (idx % 6 === 0) {
    gridColumn = `2 / span 3`;
    marginTop = "-32px";
  } else if (idx % 6 === 1) {
    gridColumn = `10 / span 3`;
    marginTop = "96px";
  } else if (idx % 6 === 2) {
    gridColumn = `4 / span 3`;
    marginTop = "-32px";
  } else if (idx % 6 === 3) {
    gridColumn = ` 8 / span 3`;
    marginTop = "226px";
  } else if (idx % 6 === 4) {
    gridColumn = `3 / span 3`;
    marginTop = "20px";
  } else if (idx % 6 === 5) {
    gridColumn = ` 8/ span 3`;
    marginTop = "206px";
  }

  return { gridColumn, marginTop };
};

export interface InfiniteGridProps {
  experimentsArray: Experiment[];
  gridRef: RefObject<HTMLDivElement>;
}

export const InfiniteGrid = ({
  experimentsArray,
  gridRef,
}: InfiniteGridProps) => {
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const { hasSmoothScrollbar } = useScrollRig();

  const { setCursorStyle } = useCursorStore();

  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    if (slug && !hasSmoothScrollbar) {
      navigate(`/experiments/${slug}`);
    }
  };

  return (
    <>
      {experimentsArray.map((experiment, idx) => {
        const { gridColumn, marginTop } = getGridPosition(idx);
        return (
          <div
            id={experiment.slug}
            ref={(e) => {
              if (e) imgRefs.current[idx] = e;
            }}
            key={experiment.slug}
            className="relative w-full aspect-square object-cover"
            onClick={() => handleClick(experiment.slug)}
            onMouseEnter={() => {
              if (!hasSmoothScrollbar) return;
              setCursorStyle("pointer");
            }}
            onMouseLeave={() => {
              if (!hasSmoothScrollbar) return;
              setCursorStyle("default");
            }}
            style={{
              gridColumn,
              marginTop,
            }}
          >
            <img
              className="w-full h-full object-cover"
              style={{
                opacity: hasSmoothScrollbar ? 0 : 1,
                pointerEvents: hasSmoothScrollbar ? "none" : "auto",
              }}
              src={experiment.img}
            />
          </div>
        );
      })}

      <UseCanvas>
        <Scene
          experimentsArray={experimentsArray}
          imgRefs={imgRefs}
          gridRef={gridRef}
        />
      </UseCanvas>
    </>
  );
};
