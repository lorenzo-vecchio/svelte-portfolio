export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    technologies?: string[];
    type: "work" | "education" | "project";
}

export const experiences: ExperienceItem[] = [
    {
        company: "ITS Academy Angelo Rizzoli",
        role: "Technical Diploma in Software Architecture",
        period: "Sep 2021 - Jul 2023",
        location: "Milan, Italy",
        description: [
            "Acquired solid foundations in programming, software development methodologies, project management and software architecture",
            "Gained practical experience through internships and real-world projects",
            "Collaborated with peers on various software development projects, enhancing teamwork and communication skills",
        ],
        technologies: ["Java", "JavaScript", "SQL", "HTML", "CSS", "React", "Vue.js", "Angular", "iOS", "Android", "Windows", "Spring Boot", "Python"],
        type: "education"
    },
    {
        company: "NEXiD",
        role: "Software Developer",
        period: "Jan 2024 - Oct 2024",
        location: "Milan, Italy",
        description: [
            "Designed and realized a full stack application from scratch",
            "Front-end built with React",
            "Backend and Database with 4D Orda",
        ],
        technologies: ["React", "4D Orda"],
        type: "work"
    },
    {
        company: "ALTEN Italia",
        role: "Software Developer",
        period: "Oct 2024 - Oct 2025",
        location: "Milan, Italy",
        description: [
            "Implemented multiple new features in a Spring Boot Application",
            "Designed and developed a front-end using SvelteKit",
            "Built a full-stack application with SvelteKit and Express.js worker service using Socket.IO",
            "Refactored and adjusted a legacy Angular application",
        ],
        technologies: ["Spring Boot", "SvelteKit", "Express.js", "Socket.IO", "Angular"],
        type: "work"
    },
    {
        company: "PwC Italy",
        role: "Software Developer",
        period: "Nov 2025 - Present",
        location: "Milan, Italy",
        description: ["Building enterprise solutions for major clients"],
        technologies: ["Enterprise", "Consulting"],
        type: "work"
    },
]