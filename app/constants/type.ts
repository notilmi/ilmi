export type Media = {
    type: "image";
    url?: string;
    altText: string;
} | {
    type: "external-video";
    videoUrl: string;
    thumbnailUrl: string;
    altText: string;
}

export type WorkExperience = {
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string | null;
    description: string;
    media?: Media[]
}

export type Project = {
    name: string;
    description: string;
    year: number;
    endYear: number | null;
    url?: string;
    technologies: string[];
    media?: Media[]
}

