export interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'active' | 'upcoming' | 'abandoned';
}

export const projects: Project[] = [
    {
        title: "endpoint-fetcher",
        description: "A type-safe API client builder for TypeScript using the Fetch API. Features dynamic paths, custom handlers, and full type inference for inputs and outputs.",
        technologies: ["TypeScript", "Fetch API", "npm"],
        liveUrl: "https://www.npmjs.com/package/endpoint-fetcher",
        githubUrl: "https://github.com/lorenzo-vecchio/endpoint-fetcher",
        status: 'active',
    },
    {
        title: "Personal Portfolio Website (this site)",
        description: "My personal portfolio website built with SvelteKit and ShadcnUI to showcase my skills, projects and experience.",
        technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "ShadcnUI", "Docker", "Nginx"],
        liveUrl: "https://lorenzovecchio.dev",
        githubUrl: "https://github.com/lorenzo-vecchio/svelte-portfolio",
        status: 'active',
    },
    {
        title: "Old Portfolio Website",
        description: "My previous portfolio website built with plain HTML, CSS, and JavaScript (and a touch of jQuery).",
        technologies: ["HTML", "CSS", "JavaScript", "jQuery"],
        liveUrl: "https://old.lorenzovecchio.dev",
        githubUrl: "https://github.com/lorenzo-vecchio/old-personal-website",
        status: 'abandoned',
    }
];