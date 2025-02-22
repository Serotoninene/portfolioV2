import { useRef } from "react";
import { UseCanvas, useScrollRig } from "@14islands/r3f-scroll-rig";
import { useNavigate } from "react-router-dom";

import { useWindowSize } from "../../../../hooks";
import { useCursorStore } from "../../../../store/useCursorStyle";

import { Experiment } from "../../experimentsData";
import { Scene } from "./Scene";

const getGridPosition = (idx: number, width: number | undefined) => {
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

  if (width && width < 768) {
    gridColumn = "span 6";
    marginTop = "0";
  }
  if (width && width < 640) {
    gridColumn = "span 12";
    marginTop = "0";
  }

  return { gridColumn, marginTop };
};

export interface InfiniteGridProps {
  experimentsArray: Experiment[];
}

export const InfiniteGrid = ({ experimentsArray }: InfiniteGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const { hasSmoothScrollbar } = useScrollRig();
  const size = useWindowSize();

  const { setCursorStyle } = useCursorStore();

  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    if (slug && !hasSmoothScrollbar) {
      navigate(`/experiments/${slug}`);
    }
  };

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-12 auto-rows-auto pt-10 gap-5 pointer-events-none`}
    >
      {experimentsArray.map((experiment, idx) => {
        const { gridColumn, marginTop } = getGridPosition(idx, size.width);
        return (
          <div
            id={experiment.slug}
            ref={(e) => {
              if (e) imgRefs.current[idx] = e;
            }}
            key={experiment.slug}
            className="relative w-full aspect-square object-cover opacity-0"
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
              marginBottom: idx === experimentsArray.length - 1 ? "20px" : 0,
            }}
          >
            <img
              className="w-full h-full object-cover"
              style={{
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
    </div>
  );
};
