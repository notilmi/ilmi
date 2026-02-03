import { Project, WorkExperience } from "./type";

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    company: "Arunika AI",
    jobTitle: "Software Engineer",
    startDate: "2024 Aug",
    endDate: "2025 May",
    description: `Working as a Software Engineer at Arunika AI, focusing on developing scalable AI infrastructure and tools to support machine learning,`,
  },
  {
    company: "Berkala Digital",
    jobTitle: "Lead Software Engineer / CTO",
    startDate: "2025 Jun",
    endDate: "2025 Dec",
    description: `Leading a team of developers at Berkala Digital to design and implement robust software solutions that drive business growth and innovation.`,
    media: [
      {
        type: "image",
        url: "/media/berkala/1.png",
        altText: "Meet 1",
      },
      {
        type: "image",
        url: "/media/berkala/2.png",
        altText: "Meet 2",
      },
    ],
  },
  {
    company: "GDGoC Sriwijaya State Polytechnic",
    jobTitle: "Lead Organizer",
    startDate: "2024 Nov",
    endDate: null,
    description: `Leading the organization of the GDGoC event at Sriwijaya State Polytechnic, coordinating activities and managing logistics to ensure a successful events`,
    media: [
      {
        type: "image",
        url: "/media/gdgoc/ls.png",
        altText: "Learning Series",
      },
      {
        type: "image",
        url: "/media/gdgoc/fg.png",
        altText: "Family Gathering",
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Sriwijaya State Polytechnic Financial Planning System",
    description: `A comprehensive financial planning system designed to streamline budgeting, forecasting, and financial analysis for Sriwijaya State Polytechnic.`,
    technologies: [
      "TypeScript",
      "React",
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "Docker",
      "Domain Driven Design",
    ],
    url: "https://simkeu.polsri.ac.id",
    year: 2024,
    endYear: null,
    media: [
      {
        type: "image",
        url: "/media/simkeu/dashboard.png",
        altText: "Dashboard View",
      },
      {
        type: "image",
        url: "/media/simkeu/api-docs.png",
        altText: "API Documentation",
      },
      {
        type: "image",
        url: "/media/simkeu/login.png",
        altText: "Login Page",
      },
      {
        type: "external-video",
        videoUrl: "https://www.youtube.com/watch?v=example",
        thumbnailUrl: "/media/simkeu/demo-thumbnail.png",
        altText: "Demo Video",
      },
    ],
  },
  {
    name: "Sriwijaya State Polytechnic Payment Administration System (Financial System Module)",
    description: `A module within the Sriwijaya State Polytechnic Payment Administration System that handles all financial transactions, billing, and payment processing.`,
    technologies: [
      "TypeScript",
      "React",
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "Docker",
      "Domain Driven Design",
      "Apache Kafka",
    ],
    year: 2025,
    endYear: null,
    url: "https://realisasi.simkeu.polsri.ac.id",
  },
  {
    name: "Sriwijaya State Polytechnic Financial System Ecosystem",
    description: `An integrated ecosystem of financial systems at Sriwijaya State Polytechnic, designed to enhance interoperability and data sharing across various financial modules.`,
    technologies: [],
    year: 2024,
    endYear: null,
    url: "https://simkeu.polsri.ac.id",
  },
  {
    name: "Palm Fruit Sales Management System",
    description: `A sales management system specifically designed for palm fruit vendors to track sales, partners, prices and generate reports.`,
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Docker",
      "Domain Driven Design",
    ],
    year: 2025,
    endYear: 2025,
    url: "https://savitajmm.com",
    media: [
      {
        type: "image",
        url: "/media/savitajmm/dashboard.png",
        altText: "Dashboard View",
      },
    ],
  },
  {
    name: "evotingku",
    description: `SaaS Product to support local organizations to host evoting event without coding any evoting application from scratch, or even order shady source-code to hold their event on top of it`,
    year: 2024,
    endYear: 2024,
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "MongoDB",
      "Midtrans API",
      "Docker",
      "Microsoft Azure",
    ],
    media: [
      {
        type: "image",
        url: "/media/evotingku/dashboard.png",
        altText: "Dashboard View",
      },
    ],
  },
  {
    name: "Touri",
    description: `Multimodal AI Travel Assistant Application to become pocket tour guide leveraging Gemini Multimodal API to provide AI 'video call' access with realtime communication`,
    year: 2025,
    endYear: 2025,
    technologies: ["TypeScript", "Next.js", "Gemini Multimodal API", "Deno"],
    media: [
      {
        type: "external-video",
        altText: "Touri Demo Video",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "/media/touri/demo-thumbnail.png",
      },
      {
        type: "external-video",
        altText: "Touri Multimodal Interaction",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "/media/touri/multimodal-thumbnail.png",
      }
    ],
  },
];
