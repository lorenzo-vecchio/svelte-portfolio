import * as m from '$lib/paraglide/messages';

export interface Project {
	title: string;
	description: string;
	technologies: string[];
	liveUrl?: string;
	downloadUrl?: string;
	githubUrl?: string;
	docsUrl?: string;
	status: 'active' | 'upcoming' | 'legacy';
	showcase?: boolean;
}

export interface ProjectGroup {
	groupTitle: string;
	groupDescription: string;
	groupTechnologies?: string[];
	projects: Project[];
	showcase?: boolean;
}

export type ProjectEntry = Project | ProjectGroup;

export function isGroup(entry: ProjectEntry): entry is ProjectGroup {
	return 'projects' in entry;
}

export function getProjectsEntries(): ProjectEntry[] {
	return [
		{
			title: 'quickbase',
			description: m.project_quickbase_desc(),
			technologies: ['Rust', 'SQLite', 'tokio', 'axum'],
			githubUrl: 'https://github.com/lorenzo-vecchio/quickbase',
			status: 'upcoming',
			showcase: true,
		},
		{
			title: 'digit-recognizer',
			description: m.project_digit_recognizer_desc(),
			technologies: ['Go', 'Machine Learning', 'Neural Networks'],
			githubUrl: 'https://github.com/lorenzo-vecchio/digit-recognizer',
			status: 'active',
			showcase: true,
		},
		{
			groupTitle: 'endpoint-fetcher',
			groupDescription: m.project_ef_group_desc(),
			groupTechnologies: ['TypeScript', 'Fetch API', 'npm', 'Next.js', 'Nextra'],
			showcase: true,
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
				},
				{
					title: '@endpoint-fetcher/auth',
					description: m.project_ef_auth_desc(),
					technologies: ['TypeScript', 'Fetch API', 'npm'],
					liveUrl: 'https://www.npmjs.com/package/@endpoint-fetcher/auth',
					githubUrl: 'https://github.com/lorenzo-vecchio/endpoint-fetcher-auth',
					docsUrl: 'https://endpoint-fetcher.lorenzovecchio.dev/plugins/auth_plugin',
					status: 'active',
				}
			],
		},
		{
			title: 'filtra-fatture',
			description: m.project_filtro_fatture_desc(),
			technologies: ['SvelteKit', 'TypeScript'],
			downloadUrl: 'https://github.com/lorenzo-vecchio/filtra-fatture/releases/latest',
			githubUrl: 'https://github.com/lorenzo-vecchio/filtra-fatture',
			status: 'active',
			showcase: true,
		},
		{
			title: m.project_portfolio_title(),
			description: m.project_portfolio_desc(),
			technologies: ['SvelteKit', 'Tailwind CSS', 'TypeScript', 'ShadcnUI', 'Docker', 'Nginx'],
			liveUrl: 'https://lorenzovecchio.dev',
			githubUrl: 'https://github.com/lorenzo-vecchio/svelte-portfolio',
			status: 'active',
			showcase: false,
		},
		{
			title: m.project_old_portfolio_title(),
			description: m.project_old_portfolio_desc(),
			technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
			liveUrl: 'https://old.lorenzovecchio.dev',
			githubUrl: 'https://github.com/lorenzo-vecchio/old-personal-website',
			status: 'legacy',
			showcase: false,
		}
	];
}

export function getShowcaseProjectsEntries(): ProjectEntry[] {
	return getProjectsEntries().filter((entry) => entry.showcase === true);
}
