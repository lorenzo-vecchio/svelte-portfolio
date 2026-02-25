export interface Project {
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    docsUrl?: string;
    status: 'active' | 'upcoming' | 'legacy';
}

export interface ProjectGroup {
    groupTitle: string;
    groupDescription: string;
    groupTechnologies?: string[];
    projects: Project[];
}

export type ProjectEntry = Project | ProjectGroup;

export function isGroup(entry: ProjectEntry): entry is ProjectGroup {
    return "projects" in entry;
}

export const projectsEntries: ProjectEntry[] = [
    {
        title: 'digit-recognizer',
        description: 'A fully hand-rolled multilayer perceptron written in Go, with zero ML dependencies. Implements every component from scratch: forward and backward passes, ReLU and Softmax activations, cross-entropy loss, He weight initialisation, and mini-batch SGD. Trained on 60,000 MNIST images, it reaches 97.4% accuracy on the 10,000-image test set. The source code is intentionally written as a learning artifact — every concept (backprop, the chain rule, overfitting, normalisation) is explained in plain English directly in comments, making the codebase a readable reference for programmers new to machine learning.',
        technologies: ['Go', 'Machine Learning', 'Neural Networks'],
        githubUrl: 'https://github.com/lorenzo-vecchio/digit-recognizer',
        status: 'active'
    },
    {
        groupTitle: "endpoint-fetcher",
        groupDescription: "A collection of libraries for building type-safe API clients in TypeScript using the Fetch API, including a core client builder and several plugins.",
        groupTechnologies: ["TypeScript", "Fetch API", "npm", "Next.js", "Nextra"],
        projects: [
            {
                title: "endpoint-fetcher",
                description: "A type-safe API client builder for TypeScript using the Fetch API. Features dynamic paths, custom handlers, and full type inference for inputs and outputs.",
                technologies: ["TypeScript", "Fetch API", "npm"],
                liveUrl: "https://www.npmjs.com/package/endpoint-fetcher",
                githubUrl: "https://github.com/lorenzo-vecchio/endpoint-fetcher",
                docsUrl: "https://endpoint-fetcher.lorenzovecchio.dev",
                status: 'active',
            },
            {
                title: "docs",
                description: "Documentation website for endpoint-fetcher built with Next.js and Nextra, providing comprehensive guides, API references, and examples.",
                technologies: ["Next.js", "Nextra", "TypeScript"],
                liveUrl: "https://endpoint-fetcher.lorenzovecchio.dev",
                githubUrl: "https://github.com/lorenzo-vecchio/endpoint-fetcher-docs",
                status: 'active',
            },
            {
                title: "@endpoint-fetcher/cache",
                description: "Caching plugin for endpoint-fetcher with type-safe wrapper support.",
                technologies: ["TypeScript", "Fetch API", "npm"],
                liveUrl: "https://www.npmjs.com/package/@endpoint-fetcher/cache",
                githubUrl: "https://github.com/lorenzo-vecchio/endpoint-fetcher-cache",
                docsUrl: "https://endpoint-fetcher.lorenzovecchio.dev/plugins/cache_plugin",
                status: 'active',
            },
            {
                title: "@endpoint-fetcher/retry",
                description: "A configurable retry plugin for endpoint-fetcher with multiple retry strategies and advanced configuration options.",
                technologies: ["TypeScript", "Fetch API", "npm"],
                liveUrl: "https://www.npmjs.com/package/@endpoint-fetcher/retry",
                githubUrl: "https://github.com/lorenzo-vecchio/endpoint-fetcher-retry",
                docsUrl: "https://endpoint-fetcher.lorenzovecchio.dev/plugins/retry_plugin",
                status: 'active',
            }
        ],
        status: 'active',
    },
    {
        title: "Personal Portfolio (this website)",
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
        status: 'legacy',
    }
];