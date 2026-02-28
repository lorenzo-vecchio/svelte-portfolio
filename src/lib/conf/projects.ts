import * as m from '$lib/paraglide/messages';

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
	return 'projects' in entry;
}

export function getProjectsEntries(): ProjectEntry[] {
	return [
		{
			title: 'digit-recognizer',
			description: m.project_digit_recognizer_desc(),
			technologies: ['Go', 'Machine Learning', 'Neural Networks'],
			githubUrl: 'https://github.com/lorenzo-vecchio/digit-recognizer',
			status: 'active'
		},
		{
			groupTitle: 'endpoint-fetcher',
			groupDescription: m.project_ef_group_desc(),
			groupTechnologies: ['TypeScript', 'Fetch API', 'npm', 'Next.js', 'Nextra'],
			projects: [
				{
					title: 'endpoint-fetcher',
					description: m.project_ef_core_desc(),
					technologies: ['TypeScript', 'Fetch API', 'npm'],
					liveUrl: 'https://www.npmjs.com/package/endpoint-fetcher',
					githubUrl: 'https://github.com/lorenzo-vecchio/endpoint-fetcher',
					docsUrl: 'https://endpoint-fetcher.lorenzovecchio.dev',
					status: 'active',
				},
				{
					title: 'docs',
					description: m.project_ef_docs_desc(),
					technologies: ['Next.js', 'Nextra', 'TypeScript'],
					liveUrl: 'https://endpoint-fetcher.lorenzovecchio.dev',
					githubUrl: 'https://github.com/lorenzo-vecchio/endpoint-fetcher-docs',
					status: 'active',
				},
				{
					title: '@endpoint-fetcher/cache',
					description: m.project_ef_cache_desc(),
					technologies: ['TypeScript', 'Fetch API', 'npm'],
					liveUrl: 'https://www.npmjs.com/package/@endpoint-fetcher/cache',
					githubUrl: 'https://github.com/lorenzo-vecchio/endpoint-fetcher-cache',
					docsUrl: 'https://endpoint-fetcher.lorenzovecchio.dev/plugins/cache_plugin',
					status: 'active',
				},
				{
					title: '@endpoint-fetcher/retry',
					description: m.project_ef_retry_desc(),
					technologies: ['TypeScript', 'Fetch API', 'npm'],
					liveUrl: 'https://www.npmjs.com/package/@endpoint-fetcher/retry',
					githubUrl: 'https://github.com/lorenzo-vecchio/endpoint-fetcher-retry',
					docsUrl: 'https://endpoint-fetcher.lorenzovecchio.dev/plugins/retry_plugin',
					status: 'active',
				}
			],
		},
		{
			title: m.project_portfolio_title(),
			description: m.project_portfolio_desc(),
			technologies: ['SvelteKit', 'Tailwind CSS', 'TypeScript', 'ShadcnUI', 'Docker', 'Nginx'],
			liveUrl: 'https://lorenzovecchio.dev',
			githubUrl: 'https://github.com/lorenzo-vecchio/svelte-portfolio',
			status: 'active',
		},
		{
			title: m.project_old_portfolio_title(),
			description: m.project_old_portfolio_desc(),
			technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
			liveUrl: 'https://old.lorenzovecchio.dev',
			githubUrl: 'https://github.com/lorenzo-vecchio/old-personal-website',
			status: 'legacy',
		}
	];
}
