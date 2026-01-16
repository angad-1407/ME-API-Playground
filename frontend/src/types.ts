export interface Link {
    id: number;
    platform: string;
    url: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string | null;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string;
    repoUrl: string | null;
    demoUrl: string | null;
    imageUrl: string | null;
}

export interface WorkExperience {
    id: number;
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
    description: string;
}

export interface Education {
    id: number;
    school: string;
    degree: string;
    year: string;
}

export interface Profile {
    id: number;
    fullName: string;
    title: string;
    bio: string;
    email: string;
    location: string | null;
    avatarUrl: string | null;
    skills: Skill[];
    projects: Project[];
    experience: WorkExperience[];
    education: Education[];
    links: Link[];
}
