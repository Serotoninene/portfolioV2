import { useLayoutEffect, useRef } from "react";

// Gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

type Props = {
  imgArray: number[];
  IMAGE_URL: string;
};

export const GalleryFlipped = ({ imgArray, IMAGE_URL }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    galleryRef.current?.classList.add("gallery--switch");
    const flipState = Flip.getState([
      ...imagesRef.current,
      ...innerImagesRef.current,
      galleryRef.current,
    ]);
    galleryRef.current?.classList.remove("gallery--switch");

    Flip.to(flipState, {
      absolute: false,
      scale: true,
      ease: "none",
      simple: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 25%",
        scrub: 1,
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
    });
  }, []);

  return (
    <div ref={containerRef} className="gallery--wrap">
      <div
        ref={galleryRef}
        className="gallery gallery--grid gallery--switch"
        data-flip-id="gallery"
      >
        {imgArray.map((_, idx) => (
          <div
            key={idx}
            ref={(e) => (imagesRef.current[idx] = e)}
            data-flip-id={"gallery__item-" + idx}
            className="gallery__item-cut"
          >
            <div
              ref={(e) => (innerImagesRef.current[idx] = e)}
              className="gallery__item-inner"
              data-flip-id={"gallery__item-inner-" + idx}
              style={{
                backgroundImage: `url(${IMAGE_URL})`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
