import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/projects';
import { emptyReadme, type Readme } from '$lib/readme';

const readmes = import.meta.glob<{ default: Readme }>('/src/lib/data/readmes/*.json');

export function entries() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function load({ params }) {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');

	const loader = readmes[`/src/lib/data/readmes/${project.name}.json`];
	const readme = loader ? (await loader()).default : emptyReadme;

	return {
		project,
		readme,
		title: `${project.name} — Lorenzo Vecchio`,
		description: project.description
	};
}
