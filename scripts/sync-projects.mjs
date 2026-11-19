#!/usr/bin/env node
/**
 * Projects sync — reads Lorenzo's public GitHub repositories and writes the
 * stable JSON consumed by the static site.
 *
 * Two sources are supported:
 *
 *   npm run projects:sync                 authenticated `gh` CLI (local dev)
 *   npm run projects:sync -- --public     public GitHub REST API, no account
 *
 * The public mode uses 1 request for the repository list and 2 requests per
 * repository (README + commits), so the current register needs 37 of the
 * 60 unauthenticated requests per hour. An optional GITHUB_TOKEN raises the
 * limit and is used automatically when present.
 *
 * The output is idempotent: no timestamps, stable ordering, and files are
 * only rewritten when their content changed.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import taskLists from 'markdown-it-task-lists';
import sanitizeHtml from 'sanitize-html';
import { createHighlighter } from 'shiki';

const OWNER = 'lorenzo-vecchio';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'src', 'lib', 'data');
const README_DIR = join(DATA_DIR, 'readmes');
const API = 'https://api.github.com';
const USER_AGENT = 'lorenzovecchio.dev-build';

/** Repositories that are not part of the portfolio. Forks are excluded automatically. */
const EXCLUDED = new Set(['neovim-config']);

/** Only for repositories that have neither a GitHub description nor a README. */
const DESCRIPTION_OVERRIDES = {
	'old-personal-website':
		'The first version of my personal website — plain HTML, CSS, JavaScript and a little jQuery.'
};

const LANGS = [
	'bash', 'c', 'cpp', 'csharp', 'css', 'diff', 'docker', 'go', 'html', 'java',
	'javascript', 'json', 'kotlin', 'lua', 'markdown', 'mdx', 'php', 'python',
	'qml', 'ruby', 'rust', 'scss', 'shell', 'sql', 'svelte', 'swift', 'toml',
	'tsx', 'typescript', 'vue', 'xml', 'yaml'
];

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const VERBOSE = args.has('--verbose');
const PUBLIC = args.has('--public') || args.has('--no-auth');
const TOKEN = process.env.GITHUB_TOKEN?.trim() || '';

const HEADERS = {
	Accept: 'application/vnd.github+json',
	'User-Agent': USER_AGENT,
	'X-GitHub-Api-Version': '2022-11-28',
	...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
};

const log = (...values) => console.log(...values);
const debug = (...values) => VERBOSE && console.log('  ·', ...values);

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function stableJson(value) {
	return `${JSON.stringify(value, null, '\t')}\n`;
}

function writeIfChanged(path, contents) {
	const previous = existsSync(path) ? readFileSync(path, 'utf8') : null;
	if (previous === contents) return false;
	if (!DRY_RUN) {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, contents);
	}
	return true;
}

function normaliseRepo(repo) {
	return {
		name: repo.name,
		description: repo.description,
		homepage: repo.homepage,
		language: repo.language,
		topics: repo.topics ?? [],
		stars: repo.stargazers_count ?? repo.stars ?? 0,
		forks: repo.forks_count ?? repo.forks ?? 0,
		license: repo.license ?? null,
		archived: repo.archived ?? repo.isArchived ?? false,
		createdAt: repo.created_at ?? repo.createdAt,
		pushedAt: repo.pushed_at ?? repo.pushedAt,
		updatedAt: repo.updated_at ?? repo.updatedAt,
		defaultBranch: repo.default_branch ?? repo.defaultBranch ?? 'main',
		repositoryUrl: repo.html_url ?? repo.repositoryUrl,
		private: Boolean(repo.private)
	};
}

function normaliseDescription(repo, readme) {
	const fromGitHub = repo.description?.trim();
	if (fromGitHub) return fromGitHub;
	if (DESCRIPTION_OVERRIDES[repo.name]) return DESCRIPTION_OVERRIDES[repo.name];

	const text = (readme ?? '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/~~~[\s\S]*?~~~/g, ' ')
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/^---[\s\S]*?---/m, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[badge[^\]]*\]\([^)]*\)/gi, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/^#{1,6}\s*/gm, '')
		.replace(/[*_`]/g, '')
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
		.find((paragraph) => paragraph.length >= 60 && !/^badge/i.test(paragraph));

	if (!text) return `A public repository by ${OWNER}.`;
	return text.length > 220 ? `${text.slice(0, 217).replace(/\s+\S*$/, '')}…` : text;
}

/* ------------------------------------------------------------------ */
/* GitHub CLI source                                                   */
/* ------------------------------------------------------------------ */

function gh(argv, { allowFailure = false } = {}) {
	try {
		return execFileSync('gh', argv, {
			encoding: 'utf8',
			maxBuffer: 64 * 1024 * 1024,
			stdio: ['ignore', 'pipe', 'pipe']
		});
	} catch (error) {
		if (allowFailure) return null;
		throw new Error(error.stderr?.toString().trim() || error.message);
	}
}

function ghJson(argv, options) {
	const output = gh(argv, options);
	if (output === null) return null;
	try {
		return JSON.parse(output);
	} catch {
		throw new Error(`gh returned invalid JSON for: gh ${argv.join(' ')}`);
	}
}

function repoApi(repo, path = '') {
	return `repos/${OWNER}/${repo}${path}`;
}

function getCommitCountGh(repo, branch) {
	const output = gh(
		['api', '-i', `${repoApi(repo, '/commits')}?sha=${encodeURIComponent(branch)}&per_page=1`],
		{ allowFailure: true }
	);
	if (!output) return 0;

	const separator = output.includes('\r\n\r\n') ? '\r\n\r\n' : '\n\n';
	const [headers] = output.split(separator);
	const link = headers.match(/^link:\s*(.+)$/im)?.[1] ?? '';
	const lastPage = link.match(/[?&]page=(\d+)>;\s*rel="last"/i)?.[1];
	return lastPage ? Number(lastPage) : 1;
}

function createGhSource() {
	return {
		label: 'gh CLI (authenticated)',
		async assertReady() {
			try {
				gh(['auth', 'status']);
			} catch {
				throw new Error(
					'GitHub CLI is not authenticated. Run `gh auth login`, or use `npm run projects:sync -- --public` for the anonymous API.'
				);
			}
		},
		async preflight() {},
		async listRepos() {
			return ghJson([
				'repo', 'list', OWNER, '--visibility', 'public', '--limit', '300',
				'--json', 'name,isFork,isArchived'
			]);
		},
		async getRepo(name) {
			const repo = ghJson(['api', repoApi(name)]);
			if (!repo) throw new Error(`Could not read repository ${name}`);
			return normaliseRepo(repo);
		},
		async getReadme(name) {
			return gh(
				['api', '-H', 'Accept: application/vnd.github.raw', repoApi(name, '/readme')],
				{ allowFailure: true }
			);
		},
		async getCommits(name, branch) {
			const commits = ghJson(
				['api', `${repoApi(name, '/commits')}?sha=${encodeURIComponent(branch)}&per_page=1`],
				{ allowFailure: true }
			);
			return {
				lastCommit:
					commits?.[0]?.commit?.committer?.date ?? commits?.[0]?.commit?.author?.date ?? null,
				count: getCommitCountGh(name, branch)
			};
		}
	};
}

/* ------------------------------------------------------------------ */
/* Public GitHub API source (no account required)                      */
/* ------------------------------------------------------------------ */

function rateLimitError(response) {
	const reset = response.headers.get('x-ratelimit-reset');
	const when = reset ? new Date(Number(reset) * 1000).toISOString() : 'unknown';
	return new Error(
		`GitHub API rate limit reached. Anonymous requests are limited to 60/hour; resets at ${when}. ` +
			'Run again later, set GITHUB_TOKEN for 5,000/hour, or use the authenticated gh CLI.'
	);
}

async function apiFetch(url, options = {}) {
	const response = await fetch(url, {
		...options,
		headers: { ...HEADERS, ...(options.headers ?? {}) },
		signal: AbortSignal.timeout(30_000)
	});
	if (response.status === 403 || response.status === 429) {
		const remaining = response.headers.get('x-ratelimit-remaining');
		const body = await response.clone().text();
		if (response.status === 429 || remaining === '0' || /rate limit/i.test(body)) {
			throw rateLimitError(response);
		}
	}
	return response;
}

async function apiJson(url) {
	const response = await apiFetch(url);
	if (!response.ok) throw new Error(`GitHub API ${response.status} for ${url}`);
	return response.json();
}

function createPublicSource() {
	let repoMap = new Map();

	return {
		label: TOKEN ? 'GitHub REST API (token)' : 'GitHub REST API (anonymous)',
		async assertReady() {
			// /rate_limit itself does not consume quota.
			const data = await apiJson(`${API}/rate_limit`);
			const remaining = data.resources?.core?.remaining ?? 0;
			if (!TOKEN) log(`  Anonymous quota before sync: ${remaining} requests.`);
		},
		async preflight(repoCount) {
			if (TOKEN) return;
			const data = await apiJson(`${API}/rate_limit`);
			const remaining = data.resources?.core?.remaining ?? 0;
			const needed = repoCount * 2 + 1;
			if (remaining < needed) {
				const reset = data.resources?.core?.reset;
				const when = reset ? new Date(reset * 1000).toISOString() : 'the hourly reset';
				throw new Error(
					`This sync needs about ${needed} anonymous GitHub API requests, but only ${remaining} remain. ` +
						`Wait for ${when}, set GITHUB_TOKEN, or use the authenticated gh CLI.`
				);
			}
		},
		async listRepos() {
			const repos = [];
			for (let page = 1; page <= 3; page += 1) {
				const batch = await apiJson(
					`${API}/users/${OWNER}/repos?per_page=100&type=public&page=${page}`
				);
				repos.push(...batch);
				if (batch.length < 100) break;
			}
			repoMap = new Map(repos.map((repo) => [repo.name, normaliseRepo(repo)]));
			return repos.map((repo) => ({
				name: repo.name,
				isFork: repo.fork,
				isArchived: repo.archived
			}));
		},
		async getRepo(name) {
			const repo = repoMap.get(name);
			if (!repo) throw new Error(`Repository ${name} was not in the public list`);
			return repo;
		},
		async getReadme(name) {
			const response = await apiFetch(`${API}/repos/${OWNER}/${name}/readme`, {
				headers: { Accept: 'application/vnd.github.raw' }
			});
			if (response.status === 404) return null;
			if (!response.ok) throw new Error(`GitHub API ${response.status} for README ${name}`);
			return response.text();
		},
		async getCommits(name, branch) {
			const response = await apiFetch(
				`${API}/repos/${OWNER}/${name}/commits?sha=${encodeURIComponent(branch)}&per_page=1`
			);
			if (response.status === 409) return { count: 0, lastCommit: null };
			if (!response.ok) throw new Error(`GitHub API ${response.status} for commits ${name}`);

			const link = response.headers.get('link') ?? '';
			const lastPage = link.match(/[?&]page=(\d+)>;\s*rel="last"/i)?.[1];
			const commits = await response.json();
			return {
				lastCommit:
					commits?.[0]?.commit?.committer?.date ?? commits?.[0]?.commit?.author?.date ?? null,
				count: lastPage ? Number(lastPage) : 1
			};
		}
	};
}

/* ------------------------------------------------------------------ */
/* README rendering                                                    */
/* ------------------------------------------------------------------ */

function slugifyHeading(value) {
	return value
		.toLowerCase()
		.replace(/<[^>]+>/g, '')
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

function isExternal(href) {
	return /^(?:https?:)?\/\//i.test(href) || /^(?:mailto|tel|data):/i.test(href);
}

function resolveRepoUrl(href, { owner, repo, branch, kind }) {
	if (!href) return href;
	const value = href.trim();
	if (!value || value.startsWith('#') || isExternal(value)) return value;

	const [pathAndQuery, ...hashParts] = value.split('#');
	const hash = hashParts.length ? `#${hashParts.join('#')}` : '';
	const clean = pathAndQuery.replace(/^\.\//, '').replace(/^\//, '');
	if (!clean) return value;

	const encoded = encodeURI(clean);
	const base =
		kind === 'image'
			? `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`
			: `https://github.com/${owner}/${repo}/blob/${branch}/`;
	return base + encoded + hash;
}

function rewriteRawHtmlUrls(html, context) {
	return html.replace(/(\s)(src|href)=("|')([^"']+)\3/gi, (match, space, attribute, quote, url) => {
		const resolved = resolveRepoUrl(url, {
			...context,
			kind: attribute.toLowerCase() === 'src' ? 'image' : 'link'
		});
		return `${space}${attribute}=${quote}${resolved}${quote}`;
	});
}

function createMarkdown(highlighter) {
	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: false,
		breaks: false,
		highlight(code, language) {
			const loaded = highlighter.getLoadedLanguages();
			const lang = loaded.includes(language) ? language : 'text';
			try {
				return highlighter.codeToHtml(code, {
					lang,
					themes: { light: 'github-light', dark: 'github-dark' },
					defaultColor: false
				});
			} catch {
				return `<pre class="shiki"><code>${md.utils.escapeHtml(code)}</code></pre>`;
			}
		}
	});

	md.use(anchor, {
		level: [2, 3, 4],
		slugify: slugifyHeading,
		permalink: false,
		uniqueSlugStartIndex: 2
	});
	md.use(taskLists, { enabled: false, label: false });

	const defaultLinkOpen =
		md.renderer.rules.link_open ??
		((tokens, index, options, _env, self) => self.renderToken(tokens, index, options));

	md.renderer.rules.link_open = (tokens, index, options, env, self) => {
		const token = tokens[index];
		const href = token.attrGet('href');
		if (href) {
			const resolved = resolveRepoUrl(href, { ...env, kind: 'link' });
			token.attrSet('href', resolved);
			if (isExternal(resolved) && !resolved.startsWith('mailto:') && !resolved.startsWith('tel:')) {
				token.attrSet('target', '_blank');
				token.attrSet('rel', 'noopener noreferrer');
			}
		}
		return defaultLinkOpen(tokens, index, options, env, self);
	};

	const defaultImage =
		md.renderer.rules.image ??
		((tokens, index, options, _env, self) => self.renderToken(tokens, index, options));

	md.renderer.rules.image = (tokens, index, options, env, self) => {
		const token = tokens[index];
		const src = token.attrGet('src');
		if (src) token.attrSet('src', resolveRepoUrl(src, { ...env, kind: 'image' }));
		token.attrSet('loading', 'lazy');
		token.attrSet('decoding', 'async');
		token.attrJoin('class', 'readme-image');
		return defaultImage(tokens, index, options, env, self);
	};

	return md;
}

function renderReadme(markdown, context) {
	if (!markdown?.trim()) return { html: '', toc: [] };

	const md = context.md;
	const source = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
	const env = { owner: context.owner, repo: context.repo, branch: context.branch };
	const tokens = md.parse(source, env);
	const toc = [];

	for (let index = 0; index < tokens.length; index += 1) {
		const token = tokens[index];
		if (token.type !== 'heading_open') continue;
		const level = Number(token.tag.slice(1));
		if (level < 2 || level > 3) continue;
		const inline = tokens[index + 1];
		const text = (inline?.children ?? [])
			.filter((child) => child.type === 'text' || child.type === 'code_inline')
			.map((child) => child.content)
			.join('')
			.trim();
		if (text) toc.push({ level, text, id: token.attrGet('id') ?? slugifyHeading(text) });
	}

	let html = md.renderer.render(tokens, md.options, env);
	html = rewriteRawHtmlUrls(html, { owner: context.owner, repo: context.repo, branch: context.branch });

	html = sanitizeHtml(html, {
		allowedTags: [
			...sanitizeHtml.defaults.allowedTags,
			'img', 'picture', 'source', 'details', 'summary', 'figure', 'figcaption',
			'del', 'ins', 'kbd', 'mark', 'div', 'span', 'input', 'sup', 'sub'
		],
		allowedAttributes: {
			'*': ['class', 'style', 'id', 'align', 'title', 'dir', 'lang', 'aria-hidden', 'aria-label'],
			a: ['href', 'name', 'target', 'rel'],
			img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding'],
			source: ['src', 'srcset', 'type', 'media', 'sizes'],
			input: ['type', 'checked', 'disabled'],
			details: ['open']
		},
		allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
		allowedSchemesByTag: { img: ['http', 'https', 'data'] },
		transformTags: {
			a(tagName, attribs) {
				const href = attribs.href ?? '';
				if (/^https?:\/\//i.test(href)) {
					attribs.target = '_blank';
					attribs.rel = 'noopener noreferrer';
				}
				return { tagName, attribs };
			},
			img(tagName, attribs) {
				attribs.loading ??= 'lazy';
				attribs.decoding ??= 'async';
				if (!attribs.class?.includes('readme-image')) {
					attribs.class = [attribs.class, 'readme-image'].filter(Boolean).join(' ');
				}
				return { tagName, attribs };
			}
		}
	});

	return { html, toc };
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main() {
	const source = PUBLIC ? createPublicSource() : createGhSource();
	await source.assertReady();

	log(`\nProjects sync · ${OWNER} · ${source.label}\n`);

	const repoList = await source.listRepos();
	const candidates = repoList
		.filter((repo) => !repo.isFork)
		.filter((repo) => !EXCLUDED.has(repo.name))
		.map((repo) => repo.name)
		.sort((a, b) => a.localeCompare(b));

	log(`Found ${candidates.length} public repositories (${repoList.length} total, forks and exclusions removed).`);
	await source.preflight(candidates.length);

	const highlighter = await createHighlighter({
		themes: ['github-light', 'github-dark'],
		langs: LANGS
	});

	const projects = [];
	const readmeFiles = new Set();
	let updatedFiles = 0;
	let unchangedFiles = 0;

	for (const name of candidates) {
		debug(`fetching ${name}`);
		const repo = await source.getRepo(name);
		if (repo.private) continue;

		const branch = repo.defaultBranch || 'main';
		const readmeMarkdown = await source.getReadme(name);
		const commits = await source.getCommits(name, branch);
		const lastCommit = commits.lastCommit ?? repo.pushedAt ?? repo.updatedAt ?? repo.createdAt;
		const description = normaliseDescription(repo, readmeMarkdown);

		const { html, toc } = renderReadme(readmeMarkdown, {
			md: createMarkdown(highlighter),
			owner: OWNER,
			repo: name,
			branch
		});

		const readmePath = join(README_DIR, `${name}.json`);
		readmeFiles.add(`${name}.json`);
		const readmePayload = stableJson({
			repository: `${OWNER}/${name}`,
			branch,
			markdown: readmeMarkdown ?? '',
			html,
			toc
		});
		if (writeIfChanged(readmePath, readmePayload)) {
			updatedFiles += 1;
			debug(`updated readmes/${name}.json`);
		} else {
			unchangedFiles += 1;
		}

		projects.push({
			slug: name,
			name: repo.name,
			description,
			repository: repo.repositoryUrl,
			homepage: repo.homepage?.trim() || null,
			language: repo.language ?? null,
			topics: [...(repo.topics ?? [])].sort((a, b) => a.localeCompare(b)),
			stars: repo.stars ?? 0,
			forks: repo.forks ?? 0,
			license:
				repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
					? repo.license.spdx_id
					: null,
			archived: Boolean(repo.archived),
			createdAt: repo.createdAt,
			lastCommit,
			commitCount: commits.count,
			defaultBranch: branch
		});

		log(`  ✓ ${name.padEnd(26)} ${String(commits.count).padStart(5)} commits   ${branch}`);
	}

	projects.sort((a, b) => {
		const byDate = new Date(b.lastCommit).getTime() - new Date(a.lastCommit).getTime();
		return byDate || a.name.localeCompare(b.name);
	});

	const projectsPath = join(DATA_DIR, 'projects.json');
	const payload = stableJson({ schemaVersion: 1, owner: OWNER, projects });
	if (writeIfChanged(projectsPath, payload)) {
		updatedFiles += 1;
		log(`\n  ✓ wrote ${relative(ROOT, projectsPath)}`);
	} else {
		unchangedFiles += 1;
	}

	if (existsSync(README_DIR)) {
		for (const file of readdirSync(README_DIR)) {
			if (!file.endsWith('.json') || readmeFiles.has(file)) continue;
			if (!DRY_RUN) unlinkSync(join(README_DIR, file));
			log(`  − removed stale readmes/${file}`);
			updatedFiles += 1;
		}
	}

	await highlighter.dispose();

	log(
		`\n${DRY_RUN ? 'Dry run' : 'Done'} · ${projects.length} projects · ${updatedFiles} files written · ${unchangedFiles} unchanged.\n`
	);
}

main().catch((error) => {
	console.error(`\n✗ ${error.message}\n`);
	process.exit(1);
});
