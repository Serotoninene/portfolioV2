export interface ProjectData {
  title: string;
  slug: string;
  introParagraph: string;
  client: string;
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
    introParagraph: ` The grid system and layout were developed from scratch with a custom
      CSS framework. Handling transitions — especially within the menu — was
      a major challenge, but it became one of the project’s key
      achievements. All animations were crafted in CSS and controlled via
      JavaScript. This project was particularly challenging due to the sheer
      number of videos, assets, and animations, but it was also one of the
      most enjoyable and rewarding experiences I've had. Every effort was
      made to adhere to HTML markup best practices.`,
    client: "Polish Studio",
    project: "Avaa Architects portfolio",
    websiteName: "avaa-architectes.webflow.io",
    websiteUrl: "https://avaa-architectes.webflow.io/",
    photos: [
      "/assets/Photos/hp-projects/s-eychenne.png",
      "/assets/Photos/hp-projects/s-eychenne.png",
      "/assets/Photos/hp-projects/s-eychenne.png",
      "/assets/Photos/hp-projects/s-eychenne.png",
    ],
    paragraphs: [
      "Hello i'm the additional paragraph, just here for test so far, but needs to bea bit long so it doesn't look too bad.",
    ],
  },
  d: {
    title: "Avaa Architects",
    slug: "avaa_architects",
    introParagraph: ` The grid system and layout were developed from scratch with a custom
      CSS framework. Handling transitions — especially within the menu — was
      a major challenge, but it became one of the project’s key
      achievements. All animations were crafted in CSS and controlled via
      JavaScript. This project was particularly challenging due to the sheer
      number of videos, assets, and animations, but it was also one of the
      most enjoyable and rewarding experiences I've had. Every effort was
      made to adhere to HTML markup best practices.`,
    client: "Polish Studio",
    project: "Avaa Architects portfolio",
    websiteName: "avaa-architectes.webflow.io",
    websiteUrl: "https://avaa-architectes.webflow.io/",
    video: "https://www.youtube.com/watch?v=8gk0v1r7x2A",
    photos: [
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGihb4FDPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGhrjq7CzJxvWinK18Uar9tDYMRGzFsybum3XZ",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGPbseOlxB1RqTnNFd5t9IskZDfWGgh3Axue0i",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUgPswjFnTS31BKxvozY6Rc9XiAEC07r524Vy",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUMwyuiFnTS31BKxvozY6Rc9XiAEC07r524Vy",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGPdhsQGbxB1RqTnNFd5t9IskZDfWGgh3Axue0",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAFrm4ordHpEckhiwbCf52orVMZau8P6dBOQz",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXntgd45f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGGBrepFWpKtZaehzdVbw3L9Mc2xsjfXInr1Sk",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGX9cSjl5f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGTphvODQMEmWIjKoDvpOiat3Rq42fJL1dCuSw",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQKUyKMXxy3LjqpuHb6m7GfiwIBaWSevTOc9R",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAMzsMwdHpEckhiwbCf52orVMZau8P6dBOQzY",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXkodMuJ5f1OuCjGxsiovyYSkHE5be2Rp7Z3I",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBlwPBMTXEYlhq87yGp6ZoMIQC4zc2rFA3VKv",
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGKyxb8d6gsn8bwcJy3NrxkXYj50qdQMuHAezP",
    ],
    paragraphs: [
      "Hello i'm the additional paragraph, just here for test so far, but needs to bea bit long so it doesn't look too bad.",
      "Second additional paragraph, just here for test so far, but needs to bea bit long so it doesn't look too bad.",
      "Third additional paragraph, just here for test so far, but needs to bea bit long so it doesn't look too bad.",
      "Foruth additional paragraph, just here for test so far, but needs to bea bit long so it doesn't look too bad.",
    ],
  },
};
