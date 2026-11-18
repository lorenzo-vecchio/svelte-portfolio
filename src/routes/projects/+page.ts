import { projectCount } from '$lib/projects';
import * as m from '$lib/paraglide/messages';

export function load() {
	return {
		title: `${m.projects_title()} — Lorenzo Vecchio`,
		description: m.projects_intro({ count: projectCount })
	};
}
