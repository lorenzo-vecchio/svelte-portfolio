import * as m from '$lib/paraglide/messages';

export function load() {
	return {
		title: `${m.privacy_title()} — Lorenzo Vecchio`,
		description: m.privacy_intro()
	};
}
