import { projectCount, projects, type ProjectRecord } from '$lib/projects';
import type { Readme } from '$lib/readme';
import * as m from '$lib/paraglide/messages';

const readmes = import.meta.glob<{ default: Readme }>('/src/lib/data/readmes/*.json');

function plainText(value: string): string {
	return value
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, '')
		.replace(/[`*_~]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * The first real paragraph of a README plus its section headings. Badges,
 * tables, lists and stray HTML are skipped so the register plate only shows
 * prose a reader can use.
 */
function excerpt(markdown: string): ProjectRecord {
	const blocks: string[] = [];
	let current: string[] = [];
	let fenced = false;

	const flush = () => {
		if (!current.length) return;
		blocks.push(current.join(' '));
		current = [];
	};

	for (const line of markdown.split('\n')) {
		if (/^\s*(```|~~~)/.test(line)) {
			flush();
			fenced = !fenced;
			continue;
		}
		if (fenced) continue;
		if (!line.trim()) {
			flush();
			continue;
		}
		current.push(line.trim());
	}
	flush();

	const prose = blocks
		.filter((block) => {
			const first = block.trim();
			return !/^(#{1,6}\s|[-*+]\s|\d+\.\s|>|\||\[!\[|<|\[[^\]]+\]:)/.test(first);
		})
		.map(plainText)
		.filter((block) => block.length >= 24)
		.filter(
			(block) =>
				!/^(source|status|install|licen[cs]e|note|requirements|build|tests?)\b/i.test(block) &&
				!/^https?:\/\//i.test(block)
		);

	let lead = '';
	for (const block of prose) {
		if (!lead) {
			lead = block;
			continue;
		}
		if (lead.length >= 150) break;
		lead = `${lead} ${block}`;
		if (lead.length >= 150) break;
	}

	const contents = [...markdown.matchAll(/^##\s+(.+)$/gm)]
		.map((match) => plainText(match[1]))
		.filter((heading) => heading.length > 0)
		.slice(0, 4);

	const quoteBlock = blocks.find((block) => block.trim().startsWith('>'));
	const note = quoteBlock
		? plainText(
				quoteBlock
					.split('\n')
					.map((line) => line.replace(/^\s*>\s?/, ''))
					.join(' ')
			).slice(0, 260)
		: '';

	return { lead: lead.slice(0, 300), note, contents };
}

export async function load() {
	const records: Record<string, ProjectRecord> = {};

	await Promise.all(
		projects.map(async (project) => {
			const loader = readmes[`/src/lib/data/readmes/${project.name}.json`];
			if (!loader) return;
			const readme = (await loader()).default;
			records[project.slug] = excerpt(readme.markdown);
		})
	);

	return {
		records,
		title: `${m.projects_title()} — Lorenzo Vecchio`,
		description: m.projects_intro({ count: projectCount })
	};
}
