import { Marquee } from "../../../../components/molecules/Marquee";

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

const TechPill = ({ text }: { text: string }) => (
  <div className="px-2 py-1 rounded-lg border border-dark">{text}</div>
);

export const AboutMe = () => {
  return (
    <div id="AboutMe" className="relative pb-5 px-5">
      <div className="pt-10 pb-14 ">
        <Marquee text="ABOUT ME" direction={1} />
      </div>
      <div className="grid grid-cols-5 md:gap-10 ">
        <div className="grid-filler"></div>
        <div className="flex justify-center max-w-[267px]">
          <img
            className="w-full object-cover"
            alt="portrait of Alex, the developer we're talking about here"
            src="https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6gxPAZgX7uwKTALhUXFxjOEWvyHartPDzflVN"
          />
        </div>

        <div id="description" className="col-span-2 max-w-[570px]">
          <p className="text-justify">
            In a previous life, I worked in the music industry, navigating the
            worlds of marketing and sales. From that time, I’ve carried over a
            deep sense of <Highlight>curiosity</Highlight>, a constant drive to{" "}
            <Highlight>improve</Highlight>, and a genuine love for{" "}
            <Highlight>collaboration</Highlight>. <br />
            Today, I’m a developer based in Paris, passionate about{" "}
            <Highlight>creating interfaces that spark</Highlight> — with subtle
            details, bold animations, and a strong focus on{" "}
            <Highlight>performance</Highlight>. I believe animations are only as
            good as the design they enhance, and I’m always looking to push the
            experience further. My favorite playgrounds are{" "}
            <Highlight>GSAP and shaders</Highlight>. I’ve explored them through
            various interactive experiments, and I’ve even started sharing what
            I’ve learned through articles and tutorials (soon to be published
            here). <br /> I work with all kinds of clients — from startups to
            digital agencies — and whether I’m in their office or working
            remotely, I always bring the same energy and attention to detail.
            <br /> Outside of development, you’ll probably find me reading
            literature, swimming laps, or watching contemporary theatre. I also
            play chess — badly (730 ELO and proudly stuck there) — but I keep
            coming back for more.
          </p>
          <h3 className="mt-10 mb-2 font-bold text-4xl">
            Techs I love to use (stack){" "}
          </h3>
          <div className="flex flex-wrap gap-y-2 gap-x-4">
            {techsArray.map((tech, idx) => (
              <TechPill key={idx} text={tech} />
            ))}
          </div>
        </div>

        <div className="grid-filler"></div>
      </div>
    </div>
  );
};
