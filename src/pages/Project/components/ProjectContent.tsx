import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import { ProjectData } from "../../../types/custom";

gsap.registerPlugin(SplitText);

interface MobilePhotoProps {
  data: string;
  idx: number;
}

const MobilePhoto = ({ data, idx }: MobilePhotoProps) => {
  const container = useRef(null);

  useGSAP(
    () => {
      const direction = idx % 2 === 0 ? 50 : -50; // Left goes up, right goes down

      gsap.fromTo(
        container.current,
        { y: direction, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="col-span-2 h-[80vh]  my-10 md:my-32 md:col-span-1"
    >
      <img
        className="opacity-0 h-full mx-auto object-cover md:object-contain rounded "
        src={data}
      />
    </div>
  );
};

interface ParagraphProps {
  content: string;
}

const ProjectParagraph = ({ content }: ParagraphProps) => {
  const container = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(container.current, {
        type: "words, chars",
        onSplit: (self) => {
          gsap.set(self.chars, {
            opacity: 0,
            filter: "blur(4px)",
          });
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 95%",
          end: "center center",
          scrub: true,
        },
      });
      tl.to(split.chars, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.01,
        ease: "none",
      });
    },
    { scope: container }
  );

  return (
    <p
      ref={container}
      className=" text-[16px] md:text-[24px] font-medium leading-[150%] max-w-[640px] my-10 md:my-32"
    >
      {content}
    </p>
  );
};

export function ProjectContent({ data }: { data: ProjectData }) {
  const { video, photos, paragraphs } = data;
  // We chunk the photos into groups of 3
  const photoChunks = photos.reduce((chunks: string[][], photo, index) => {
    if (index % 3 === 0) {
      // start a new chunk every 3 photos
      chunks.push([]);
    }
    chunks[chunks.length - 1].push(photo);
    return chunks;
  }, []);

  // Helper to compute alignment class based on the paragraph’s order.
  const getAlignmentClass = (paragraphIndex: number) => {
    if (paragraphIndex % 3 === 0) return "justify-start";
    if (paragraphIndex % 3 === 1) return "justify-center";
    return "justify-end";
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-3 md:px-5 md:gap-6 mt-10 md:mt-32">
      {/* INTRO ALWAYS STAYS LIKE THIS */}
      <div className="h-[calc(100vw*9/16)] border col-span-2 overflow-hidden">
        <video
          src={video}
          poster={photos[0]}
          className="w-full h-full object-cover opacity-0"
          autoPlay
          playsInline
          loop
        />
      </div>
      <div className="col-span-2 my-10">
        <ProjectParagraph content={paragraphs![0]} />
      </div>

      {photoChunks.map((chunk, index) => (
        <section key={index} className="col-span-2 grid grid-cols-2 gap-3">
          <div className="h-[calc(100vw*9/16)] col-span-2 my-10 md:my-32">
            <img
              className="opacity-0 h-full w-full object-cover"
              src={chunk[0]}
            />
          </div>
          {chunk[1] && <MobilePhoto data={chunk[1]} idx={0} />}
          {chunk[2] && <MobilePhoto data={chunk[2]} idx={1} />}
          {paragraphs[index + 1] ? (
            <div
              className={`col-span-2 my-10 md:my-24 flex ${getAlignmentClass(
                index + 1
              )}`}
            >
              <ProjectParagraph content={paragraphs[index + 1]} />
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
