#!/usr/bin/env node
/**
 * Build-time GitHub refresh.
 *
 * `npm run build` calls this before the site is compiled, so a deploy always
 * picks up the current GitHub state (descriptions, topics, commit counts, dates
 * and READMEs). It prefers the authenticated gh CLI, falls back to the GitHub
 * REST API, and keeps the data already on disk if GitHub cannot be reached.
 *
 * Flags / environment:
 *   SKIP_GITHUB_SYNC=1     use the data already in src/lib/data
 *   REQUIRE_FRESH_DATA=1   fail the build instead of falling back to it
 *   GITHUB_TOKEN=...       raise the REST API limit (5,000/hour)
 */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = join(ROOT, 'src', 'lib', 'data', 'projects.json');
const SYNC_SCRIPT = join(ROOT, 'scripts', 'sync-projects.mjs');

const skip = process.env.SKIP_GITHUB_SYNC === '1' || process.argv.includes('--offline');
const requireFresh = process.env.REQUIRE_FRESH_DATA === '1';
const token = process.env.GITHUB_TOKEN?.trim() || '';

function hasData() {
	try {
		const data = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
		return Array.isArray(data.projects) && data.projects.length > 0;
	} catch {
		return false;
	}
}

function ghIsAuthenticated() {
	const result = spawnSync('gh', ['auth', 'status'], { stdio: 'ignore' });
	return result.status === 0;
}

function runSync(args, label) {
	console.log(`\nGitHub data · ${label}\n`);
	const result = spawnSync(process.execPath, [SYNC_SCRIPT, ...args], {
		cwd: ROOT,
		stdio: 'inherit'
	});
	return result.status === 0;
}

if (skip) {
	console.log('\nGitHub data · skipped (SKIP_GITHUB_SYNC=1); using the data on disk.\n');
	process.exit(0);
}

const attempts = [];
if (token) {
	attempts.push({ args: ['--public'], label: 'GitHub REST API (token)' });
} else if (ghIsAuthenticated()) {
	attempts.push({ args: [], label: 'gh CLI (authenticated)' });
	attempts.push({ args: ['--public'], label: 'GitHub REST API (anonymous)' });
} else {
	attempts.push({ args: ['--public'], label: 'GitHub REST API (anonymous)' });
}

for (const attempt of attempts) {
	if (runSync(attempt.args, attempt.label)) process.exit(0);
	if (attempts.length > 1) {
		console.warn(`\n⚠ ${attempt.label} failed; trying the next source.\n`);
	}
}

if (hasData()) {
	console.warn(
		'\n⚠ GitHub refresh failed. Continuing with the project data already in src/lib/data.\n' +
			'  Set GITHUB_TOKEN for a reliable authenticated sync, or re-run later.\n'
	);
	process.exit(requireFresh ? 1 : 0);
}

console.error(
	'\n✗ GitHub refresh failed and src/lib/data/projects.json is missing or empty.\n' +
		'  Run `npm run projects:refresh` with network access, or provide GITHUB_TOKEN.\n'
);
process.exit(1);
