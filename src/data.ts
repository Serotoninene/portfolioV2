import { Project, ProjectData } from "./types/custom";

export const projects: Project[] = [
  {
    title: "COSTAR",
    subtitle: "IA Chatbot",
    img: "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L63NrTRN6POxralItAup2niSsje8zC7G4T5UWN",
    slug: "costar",
  },
  {
    title: "AVAA ARCHITECTS",
    slug: "avaa_architects",
    subtitle: "Architect's website",
    img: "/assets/Photos/hp-projects/avaa.webp",
  },
  {
    title: "SIMON EYCHENNE",
    subtitle: "Photo portfolio",
    img: "/assets/Photos/hp-projects/s-eychenne.png",
    slug: "simon_eychenne",
  },
  {
    title: "SKOP",
    slug: "skop",
    subtitle: "Marketplace",
    img: "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6LXgJ2z3TrtERFNjmSMUKXy1DQbAxq5lWf9CP",
  },
  {
    title: "VIRGILE HASSELMANN",
    subtitle: "Video-maker portfolio",
    slug: "virgile_hasselmann",
    img: "/assets/Photos/hp-projects/virgile.webp",
  },
  // {
  //   title: "SEROTONINENE",
  //   subtitle: "Illustration shop",
  //   img: "/assets/Photos/hp-projects/serotoninene.webp",
  //   slug: "serotoninene",
  // },
  // {
  //   title: "SALINGER YOU'RE MY HERO",
  //   subtitle: "Personal project",
  //   img: "/assets/Photos/hp-projects/salinger.webp",
  //   slug: "salinger",
  // },
];

export const projectsData: Record<string, ProjectData> = {
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
  skop: {
    title: "Skop's Marketplace",
    slug: "skop",
    introParagraph: `I had the opportunity to collaborate with Skop, a dynamic startup aiming to give a second life to second-hand construction materials. The project was particularly exciting as it involved building a community-driven marketplace, where both individuals and companies can create their own shops and sell their materials. Beyond the classic marketplace setup, Skop introduced a smart feature: users could create lists of needed products and receive email notifications when matching offers became available, adding an extra layer of interaction to the platform.`,
    client: "Skop",
    project: "Marketplace",
    websiteName: "www.skop.app",
    websiteUrl: "https://www.skop.app/",
    video:
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6jq0nuip9ClRdzogfV2w0yYZPUHOXTcDQKn1N",
    photos: [
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6LXgJ2z3TrtERFNjmSMUKXy1DQbAxq5lWf9CP",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6YCojhO21rOcCJiaDP0HsGk83SNQE2AXKuB5f",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6vxUZ19nGURo4I1OkNdyrJwbSA0xK2fH3sX6c",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6brNXlWLwrgLu7cHh3FYli2Z45BCESAaPsXGD",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6Lq7ECg3TrtERFNjmSMUKXy1DQbAxq5lWf9CP",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6IfqVqsOM64X29GTPJjpSlksgFUAZu1DWOmez",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6mqbjxXh5gaDRxLJrctmoE3Me78wH2WyQsObj",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6IbgrixOM64X29GTPJjpSlksgFUAZu1DWOmez",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6YkoXLQu21rOcCJiaDP0HsGk83SNQE2AXKuB5",
    ],
    paragraphs: [
      "The project was built with Next.js, and I focused heavily on key backend flows. I managed the authentication system to ensure a smooth and secure user experience, and set up the entire payment process using Stripe. I also handled the 'add a new product' flow, integrating it closely with Stripe to allow sellers to manage their listings and payouts seamlessly. All data exchanges were handled through a GraphQL API, which I linked and maintained throughout the project.",
      "On the frontend, I worked on integrating several key components to shape the user experience. This included building the homepage structure, implementing a custom slider, and setting up the product pages and cart functionality. The goal was to create a clean, intuitive interface that made browsing, selling, and buying as straightforward as possible.",
      "This project was a great opportunity to work on a marketplace with multiple layers of complexity, blending community features, live product tracking, and smooth transactional flows — all while ensuring performance and scalability remained a priority.",
    ],
  },
  virgile_hasselmann: {
    title: "Virgile Hasselmann Portfolio",
    slug: "virgile_hasselmann",
    introParagraph: `I had the opportunity to collaborate with Virgile Hasselmann, a talented photographer and videographer based in Paris, on the creation of his portfolio. I was responsible for both the design and the full development of the project, handling the front-end and back-end. Built with Next.js, the site was structured around two distinct sections: one dedicated to Virgile’s video work and the other to his photography, offering visitors a clear and immersive way to explore his artistic universe.`,
    client: "Virgile Hasselmann",
    project: "Portfolio",
    websiteName: "www.virgilehasselmann.com",
    websiteUrl: "https://www.virgilehasselmann.com/",
    video:
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6q5rTT2b7CVyc9iTYZIuk08RxtGmwg6bUMolv",
    photos: [
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L694I2nI5dERzstJp6gnS8y9lw4IY1orXZTkue",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6gF1kIz7uwKTALhUXFxjOEWvyHartPDzflVNS",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6wXmMHfDoDU0xdY4lwFI8VesO7JNtkPXGuRMQ",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6JXApWDNTBzI43Vp2RcXtq5aYCHvGxiZuO8jP",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6wl9tQSDoDU0xdY4lwFI8VesO7JNtkPXGuRMQ",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6pscgow4Sdp8wtgirb9UkWJYFcjB2XzVhGmAT",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L62Qve4dLRxgZjY9rsJPfv4GwtTAndpIBhKUbm",
      "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L6QUmJenZIiwGZoPng4uEMaqKWm6XRBp1kV89N",
    ],
    paragraphs: [
      "For the backend, I relied on my trusted Next.js stack. I managed the database using Prisma, ensuring a robust and scalable data layer. To build the API, I used tRPC alongside Zod, creating fully type-safe endpoints and streamlining communication between the client and the server.",
      "I also developed a lightweight custom back office for Virgile, allowing him to easily upload and manage his photos and videos. This secure admin interface gave him full autonomy over his portfolio content, while keeping the backend simple and efficient.",
      "For the motion design, I chose Framer Motion over my usual GSAP setup. It's lighter and integrates well with React, making animations easy to implement. Even though it’s a bit more limited than GSAP, it was a perfect fit for creating smooth transitions and clean interactions without adding extra weight.",
    ],
  },
};
