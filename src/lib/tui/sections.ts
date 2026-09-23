import * as m from '$lib/paraglide/messages';
import { localizeHref } from '$lib/paraglide/runtime';
import type { TuiSection } from './types';

/**
 * Presentation metadata for the TUI pages.
 *
 * URLs are owned by SvelteKit's file-based router: `path` always matches the
 * route folder under `src/routes` (and `page.route.id` at runtime). This table
 * only adds the things a route file cannot know about itself — a tab index,
 * a fake filename and a filetype for the statusline.
 */
export function getSections(): TuiSection[] {
	const definitions: Array<Omit<TuiSection, 'label'>> = [
		{ id: 'home', path: '/tui', filename: 'home.ts', filetype: 'typescript', tabKey: '1' },
		{ id: 'about', path: '/tui/about', filename: 'about.ts', filetype: 'typescript', tabKey: '2' },
		{ id: 'projects', path: '/tui/projects', filename: 'projects.ts', filetype: 'typescript', tabKey: '3' },
		{ id: 'skills', path: '/tui/skills', filename: 'skills.ts', filetype: 'typescript', tabKey: '4' },
		{ id: 'experience', path: '/tui/experience', filename: 'experience.ts', filetype: 'typescript', tabKey: '5' },
		{ id: 'contact', path: '/tui/contact', filename: 'contact.ts', filetype: 'typescript', tabKey: '6' },
		{ id: 'privacy', path: '/tui/privacy', filename: 'privacy.md', filetype: 'markdown', tabKey: '7' },
	];

	const labels: Record<string, string> = {
		home: m.nav_home(),
		about: m.nav_about(),
		projects: m.nav_projects(),
		skills: m.nav_skills(),
		experience: m.nav_experience(),
		contact: m.nav_contact(),
		privacy: m.footer_privacy(),
	};

	return definitions.map((definition) => ({
		...definition,
		label: labels[definition.id],
	}));
}

/** Locale-aware href for a section (e.g. `/it/tui/projects`). */
export function sectionHref(section: TuiSection): string {
	return localizeHref(section.path);
}

/** Resolve the section matching a SvelteKit route id, if any. */
export function findSectionByRouteId(routeId: string | null): TuiSection | undefined {
	if (!routeId) return undefined;
	return getSections().find((section) => section.path === routeId);
}
