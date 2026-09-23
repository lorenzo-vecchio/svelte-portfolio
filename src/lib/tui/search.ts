import { getExperiences, getProjectsEntries, getSkillCategories, isGroup } from '$lib/conf';
import { getCommands } from './commands';
import { getSections } from './sections';
import type { SearchResult } from './types';

/** Build the full, static-ish index every time the locale changes. */
export function buildSearchIndex(): SearchResult[] {
	const sections: SearchResult[] = getSections().map((section) => ({
		id: `section.${section.id}`,
		kind: 'section',
		title: section.label,
		subtitle: section.filename,
		commandId: `go.${section.id}`,
	}));

	const projects: SearchResult[] = getProjectsEntries().flatMap((entry) => {
		if (isGroup(entry)) {
			return [
				{
					id: `project-group.${entry.groupTitle}`,
					kind: 'project' as const,
					title: entry.groupTitle,
					subtitle: entry.groupDescription,
					commandId: 'go.projects',
				},
				...entry.projects.map((project) => ({
					id: `project.${entry.groupTitle}.${project.title}`,
					kind: 'project' as const,
					title: project.title,
					subtitle: `${entry.groupTitle} · ${project.technologies.join(', ')}`,
					commandId: 'go.projects',
				})),
			];
		}
		return [
			{
				id: `project.${entry.title}`,
				kind: 'project' as const,
				title: entry.title,
				subtitle: entry.technologies.join(', '),
				commandId: 'go.projects',
			},
		];
	});

	const skills: SearchResult[] = getSkillCategories().map((category) => ({
		id: `skill.${category.title}`,
		kind: 'skill',
		title: category.title,
		subtitle: category.skills.map((skill) => skill.name).join(', '),
		commandId: 'go.skills',
	}));

	const experience: SearchResult[] = getExperiences().map((item) => ({
		id: `experience.${item.company}`,
		kind: 'experience',
		title: `${item.company} — ${item.role}`,
		subtitle: item.period,
		commandId: 'go.experience',
	}));

	const commands: SearchResult[] = getCommands().map((command) => ({
		id: `command.${command.id}`,
		kind: 'command',
		title: command.label,
		subtitle: command.description,
		commandId: command.id,
	}));

	return [...commands, ...sections, ...projects, ...skills, ...experience];
}

/**
 * Substring search with a tiny relevance ranking:
 * title-prefix beats title-match beats subtitle-match.
 */
export function searchAll(query: string, index: SearchResult[]): SearchResult[] {
	const needle = query.trim().toLowerCase();
	if (!needle) return index;

	const ranked: Array<{ result: SearchResult; score: number }> = [];
	for (const result of index) {
		const title = result.title.toLowerCase();
		const subtitle = result.subtitle.toLowerCase();
		const score = title.startsWith(needle)
			? 0
			: title.includes(needle)
				? 1
				: subtitle.includes(needle)
					? 2
					: -1;
		if (score >= 0) ranked.push({ result, score });
	}

	return ranked
		.sort((a, b) => a.score - b.score)
		.slice(0, 40)
		.map((entry) => entry.result);
}
