import { useGSAP } from "@gsap/react";
import { Marquee } from "../../../../components/molecules/Marquee";
import { useRef, useState } from "react";
import gsap, { Expo, Power3 } from "gsap";
import { AnimLetters } from "../../../../components/atoms";
import { useColorContext } from "../../../../hooks/useColorContext";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold">{children}</span>
);

const techsArray = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Prisma",
  "tRPC",
  "GraphQL",
  "Zod",
  "Three.js",
  "React-Three-Fiber",
  "Figma",
  "GitHub",
  "GitLab",
];

const TechPill = ({
  text,
  secondaryColor,
}: {
  text: string;
  secondaryColor: string;
}) => (
  <div
    className="px-2 py-1 rounded-lg border border-[] text-sm"
    style={{ border: `1px solid ${secondaryColor}` }}
  >
    {text}
  </div>
);

export const AboutMe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { colors } = useColorContext();
  const [isStackAnimated, setIsStackAnimated] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: Power3.easeOut, duration: 0.7 },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
        },
      });

      const paragraphs = gsap.utils.toArray("#About_Description p");
      const stackPills = gsap.utils.toArray("#About_Stack-pills div");

      gsap.set("#About_Picture-wrapper", { clipPath: "inset(0 0 100% 0)" }); // Hide by clipping from bottom
      gsap.set(paragraphs, { opacity: 0 });
      gsap.set(stackPills, { opacity: 0, y: 54 });

      tl.to("#About_Picture-wrapper", {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: Expo.easeInOut,
      });
      tl.to(paragraphs, { opacity: 1, stagger: 0.1 }, "<0.1");
      tl.add(() => {
        setIsStackAnimated(true);
      }, "<");
      tl.to(stackPills, { opacity: 1, y: 0, stagger: 0.02 }, "<0.1");
    },
    { scope: ref }
  );

  return (
    <div id="About" className="relative pb-5 px-5">
      <div className="pt-10 pb-6 md:pb-14 ">
        <Marquee text="ABOUT ME" direction={1} />
      </div>
      <div
        ref={ref}
        className="grid md:grid-cols-3 gap-5 md:gap-10 md:max-w-[820px] md:m-auto"
      >
        <div
          id="About_Picture-wrapper"
          className="relative order-1 md:-order-none overflow-hidden"
        >
          <img
            className="h-40 w-full md:h-full object-cover"
            alt="portrait of Alex, the developer we're talking about here"
            src="https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6gxPAZgX7uwKTALhUXFxjOEWvyHartPDzflVN"
          />
        </div>

        <div id="About_Description" className="md:col-span-2">
          <p className="text-justify text-sm md:text-base">
            In a previous life, I worked in the music industry, navigating the
            worlds of marketing and sales. From that time, I’ve carried over a
            deep sense of <Highlight>curiosity</Highlight>, a constant drive to{" "}
            <Highlight>improve</Highlight>, and a genuine love for{" "}
            <Highlight>collaboration</Highlight>.
          </p>
          <p>
            Today, I’m a developer based in Paris, passionate about{" "}
            <Highlight>creating interfaces that spark</Highlight> — with subtle
            details, bold animations, and a strong focus on{" "}
            <Highlight>performance</Highlight>. I believe animations are only as
            good as the design they enhance, and I’m always looking to push the
            experience further. My favorite playgrounds are{" "}
            <Highlight>GSAP and shaders</Highlight>. I’ve explored them through
            various interactive experiments, and I’ve even started sharing what
            I’ve learned through articles and tutorials (soon to be published
            here).
          </p>
          <p>
            I work with all kinds of clients — from startups to digital agencies
            — and whether I’m in their office or working remotely, I always
            bring the same energy and attention to detail.
          </p>
          <p>
            Outside of development, you’ll probably find me reading literature,
            swimming laps, or watching contemporary theatre. I also play chess —
            badly (730 ELO and proudly stuck there) — but I keep coming back for
            more.
          </p>
          <h3 id="About_Stack-title" className="mt-10 mb-2 font-bold text-4xl">
            <AnimLetters
              string="Techs I love to use"
              start={isStackAnimated}
              stagger={0.01}
              delay={0}
            />
          </h3>
          <div
            id="About_Stack-pills"
            className="flex flex-wrap gap-y-2 gap-x-4"
          >
            {techsArray.map((tech, idx) => (
              <TechPill
                key={idx}
                text={tech}
                secondaryColor={colors.secondaryColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
