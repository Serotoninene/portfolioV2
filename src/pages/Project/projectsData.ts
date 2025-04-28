export interface ProjectData {
  title: string;
  introParagraph: string;
  client: string;
  slug: string;
  color?: string;
  clientUrl?: string;
  project: string;
  websiteName: string;
  websiteUrl?: string;
  photos: string[];
  video?: string;
  paragraphs: string[];
}

export const projectsData: Record<string, ProjectData> = {
  avaa_architects: {
    title: "Avaa Architects",
    slug: "avaa_architects",
    introParagraph: `This Webflow-based website is a sleek and elegant portfolio designed by Polish Studio for Avaa Architect. It highlights the agency’s architectural work, introduces their team, and showcases their expertise — all within a clean, fluid interface enhanced by thoughtful motion design.`,
    client: "Polish Studio",
    clientUrl: "https://www.polish-studio.fr/",
    project: "Avaa Architects portfolio",
    websiteName: "avaa-architectes.webflow.io",
    websiteUrl: "https://avaa-architectes.webflow.io/",
    video:
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6IgRftQOM64X29GTPJjpSlksgFUAZu1DWOmez",

    photos: [
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6Rbto8vkoXGl569imgek8qhVTc0NspE24ZYdP",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L62QgIsWcRxgZjY9rsJPfv4GwtTAndpIBhKUbm",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6QELs1fZIiwGZoPng4uEMaqKWm6XRBp1kV89N",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6b6VJ9VYLwrgLu7cHh3FYli2Z45BCESAaPsXG",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6e9JFCFwmSiAoR9BqIWsc2YmnNt540jMXpfGD",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6YkxKKpb21rOcCJiaDP0HsGk83SNQE2AXKuB5",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6AOoNjjlHp4jJ7x9HMZr2VFukXLhNsC8wI1lm",
    ],
    paragraphs: [
      "My main contribution to this project was the development of an infinite slider built with Three.js and custom shaders, adding a dynamic visual layer to the homepage. I also implemented seamless page transitions using Barba.js to enhance the overall browsing experience.",
      "Although it was my first time working with Webflow, most of my contributions were developed using standard HTML, CSS, and JavaScript. I integrated these custom elements directly into the Webflow project to extend its capabilities beyond the built-in features.",
      "It was a great experience collaborating with Polish Studio — their attention to detail and creative direction made the process both inspiring and rewarding. This project was a perfect blend of design and interactivity, and a solid first step into working with Webflow.",
    ],
  },
  simon_eychenne: {
    title: "Simon Eychenne Portfolio",
    slug: "simon_eychenne",
    introParagraph: `I had the opportunity to collaborate with the talented photographer Simon Eychenne, who works between Paris, Brussels, and Madrid. Together, we crafted the design and defined the motion principles for his portfolio. I then fully developed the website using Next.js, aiming for a minimalistic yet refined experience that puts Simon’s photography at the forefront, with smooth, understated interactions to enhance the viewing experience.`,
    client: "Simon Eychenne",
    project: "Simon Eychenne portfolio",
    websiteName: "www.simoneychenne.com",
    websiteUrl: "https://www.simoneychenne.com/",
    video:
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6Sd2VkbJWbHgynXO3F4YeAL67G2NqmkzuxRld",
    photos: [
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6qsET3Hb7CVyc9iTYZIuk08RxtGmwg6bUMolv",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6MhONzrdxqCNH1sfIpPdVyZu0Do8kwMhLRWY2",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L67C0h5ArVvyJ8fsCuabP6XEDtAkFnrxLB9IQS",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6RZ1nIQrkoXGl569imgek8qhVTc0NspE24ZYd",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6jCUzvGp9ClRdzogfV2w0yYZPUHOXTcDQKn1N",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6SuV3rIUJWbHgynXO3F4YeAL67G2NqmkzuxRl",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6q36QkjKb7CVyc9iTYZIuk08RxtGmwg6bUMol",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L621KLpXRxgZjY9rsJPfv4GwtTAndpIBhKUbm7",
    ],
    paragraphs: [
      "The project was built with Next.js. I decided to go with the pages architecture, as it made implementing page transition animations much simpler. For the backend, I set up a lightweight serverless infrastructure: images are hosted on AWS S3, the database is managed with CockroachDB, and I built the API using Prisma and tRPC to ensure smooth, type-safe communication between the client and server.",
      "For the motion design, I chose GSAP to handle animations across the entire website. I particularly relied on GSAP’s FLIP plugin to create smooth transitions within the gallery, allowing images to seamlessly animate between a grid layout and a column view. This approach helped maintain a fluid and polished browsing experience while keeping interactions light and intuitive.",
      "In parallel, I integrated a touch of WebGL using Three.js, enhanced with custom shaders. This allowed me to design subtle visual effects, such as dynamic hover animations on images, bringing an extra layer of depth and refinement to the minimalistic design without disrupting the overall simplicity.",
    ],
  },
  costar: {
    title: "Costar IA Chatbot",
    slug: "costar",
    introParagraph: `I worked with Costar, a client based in Singapore, to develop the front-end interface for an advanced AI chatbot platform. The project aimed to deliver a rich and versatile user experience, capable of handling video and voice conversations, while dynamically integrating interactive widgets based on user requests. Depending on the conversation, the chatbot can display product recommendations, movie details, travel information, and more — creating a highly complete and responsive interaction flow.`,
    client: "Costar",
    project: "IA ChatBot",
    websiteName: "Still in development",
    video:
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6oxVy57gdCyMawJf59NTSEA2n1Veogzv6Icbq",
    photos: [
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L63NrTRN6POxralItAup2niSsje8zC7G4T5UWN",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6b6l3wcQLwrgLu7cHh3FYli2Z45BCESAaPsXG",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L69x6rBq5dERzstJp6gnS8y9lw4IY1orXZTkue",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L615J9YZvpvVu3k7MUxIriN8ToB25w9EqbYJjz",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6O4giuptjgW5nQ7itrKZ30okTFqxlmyURfMBb",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L67dToJVrVvyJ8fsCuabP6XEDtAkFnrxLB9IQS",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6k4icu7QEr5lhURcnwTv49iDOzKS6CkWxHPLq",
    ],
    paragraphs: [
      "We built a fully custom front-end framework from scratch to power the Costar AI platform, relying only on GSAP for animation handling. Routing, state management, and component architecture were all developed in-house to meet the specific needs of the project. This approach gave us full control over the platform’s behavior and performance.",
      "To bring visual richness to voice conversations, I integrated WebGL shaders to create animated audio waves. These subtle visual effects added an immersive touch to the experience without disrupting the platform’s clean and responsive design. GSAP was also used extensively to ensure all animations remained smooth and lightweight.",
      "For voice interaction, we combined Whisper for speech-to-text transcription, ElevenLabs for generating natural text-to-speech responses, and a Voice Activity Detection (VAD) system to manage audio input precisely. This setup allowed for real-time, fluid conversations with minimal latency, greatly enhancing the overall user experience.",
    ],
  },
};
