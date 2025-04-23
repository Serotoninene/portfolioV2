export interface ProjectData {
  title: string;
  slug: string;
  introParagraph: string;
  client: string;
  color?: string;
  clientUrl?: string;
  project: string;
  websiteName: string;
  websiteUrl: string;
  photos: string[];
  video?: string;
  paragraphs: string[];
}

export const projectsData: Record<string, ProjectData> = {
  avaa_architects: {
    title: "Avaa Architects",
    slug: "avaa_architects",
    color: "#ff0000",
    introParagraph: `This Webflow-based website is a sleek and elegant portfolio designed by Polish Studio for Avaa Architect. It highlights the agency’s architectural work, introduces their team, and showcases their expertise — all within a clean, fluid interface enhanced by thoughtful motion design.

`,
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
};
