export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  upcoming?: boolean;
  abandoned?: boolean;
}

export const projects: Project[] = [
    {
        title: "Personal Portfolio Website (this site)",
        description: "My personal portfolio website built with SvelteKit and ShadcnUI to showcase my skills, projects and experience.",
        technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "ShadcnUI", "Docker", "Nginx"],
        liveUrl: "https://lorenzovecchio.dev",
        githubUrl: "https://github.com/lorenzo-vecchio/svelte-portfolio",
        upcoming: true
    },
    {
        title: "Old Portfolio Website",
        description: "My previous portfolio website built with plain HTML, CSS, and JavaScript (and a touch of jQuery).",
        technologies: ["HTML", "CSS", "JavaScript", "jQuery"],
        liveUrl: "https://old.lorenzovecchio.dev",
        githubUrl: "https://github.com/lorenzo-vecchio/old-personal-website",
        abandoned: true,
    }
];