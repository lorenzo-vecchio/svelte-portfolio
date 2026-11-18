import data from '$lib/data/projects.json';

export interface Project {
	slug: string;
	name: string;
	description: string;
	repository: string;
	homepage: string | null;
	language: string | null;
	topics: string[];
	stars: number;
	forks: number;
	license: string | null;
	archived: boolean;
	createdAt: string;
	lastCommit: string;
	commitCount: number;
	defaultBranch: string;
}

interface ProjectsData {
	schemaVersion: number;
	owner: string;
	projects: Project[];
}

const payload = data as ProjectsData;

export const projects: Project[] = payload.projects;
export const projectCount = projects.length;
export const owner = payload.owner;

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}

export function getRecentProjects(limit: number): Project[] {
	return projects.slice(0, limit);
}

export function getProjectNeighbours(slug: string): {
	previous: Project;
	next: Project;
	index: number;
} {
	const index = Math.max(
		0,
		projects.findIndex((project) => project.slug === slug)
	);
	return {
		previous: projects[(index - 1 + projects.length) % projects.length],
		next: projects[(index + 1) % projects.length],
		index
	};
}

export function getTopicFilters(limit = 12): Array<{ topic: string; count: number }> {
	const counts = new Map<string, number>();
	for (const project of projects) {
		for (const topic of project.topics) counts.set(topic, (counts.get(topic) ?? 0) + 1);
	}
	return [...counts.entries()]
		.map(([topic, count]) => ({ topic, count }))
		.filter(({ count }) => count > 1)
		.sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic))
		.slice(0, limit);
}

export function getLatestCommitDate(): string {
	return projects.reduce(
		(latest, project) => (project.lastCommit > latest ? project.lastCommit : latest),
		projects[0]?.lastCommit ?? ''
	);
}

export function getStack(project: Project, limit = 4): string[] {
	return project.topics.slice(0, limit);
}
