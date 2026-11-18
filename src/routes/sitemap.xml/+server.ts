import { getLatestCommitDate, projects } from '$lib/projects';

export const prerender = true;

const SITE = 'https://lorenzovecchio.dev';
const latest = getLatestCommitDate().slice(0, 10);

function url(loc: string, lastmod = latest, priority = '0.7') {
	return `\t<url>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t\t<priority>${priority}</priority>\n\t</url>`;
}

export function GET() {
	const rows: string[] = [];

	for (const locale of ['en', 'it'] as const) {
		const prefix = locale === 'it' ? '/it' : '';
		rows.push(url(`${SITE}${prefix}/`, latest, '1.0'));
		rows.push(url(`${SITE}${prefix}/projects`, latest, '0.9'));
		rows.push(url(`${SITE}${prefix}/privacy`, latest, '0.3'));

		for (const project of projects) {
			rows.push(
				url(
					`${SITE}${prefix}/projects/${project.slug}`,
					project.lastCommit.slice(0, 10),
					'0.6'
				)
			);
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows.join('\n')}
</urlset>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
