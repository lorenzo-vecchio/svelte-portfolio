import { existsSync, readFileSync } from 'node:fs';

const path = new URL('../src/lib/data/projects.json', import.meta.url);

function fail(message) {
	console.error(`\n✗ ${message}\n`);
	process.exit(1);
}

if (!existsSync(path)) {
	fail(
		'Missing src/lib/data/projects.json. Run `npm run projects:refresh` ' +
			'(or `npm run projects:sync` for the authenticated gh CLI), ' +
			'or build with Docker, whose data stage fetches it automatically.'
	);
}

try {
	const data = JSON.parse(readFileSync(path, 'utf8'));
	if (!Array.isArray(data.projects) || data.projects.length === 0) {
		fail('src/lib/data/projects.json is empty. Re-run `npm run projects:refresh`.');
	}
} catch (error) {
	fail(`Could not read src/lib/data/projects.json: ${error.message}`);
}
