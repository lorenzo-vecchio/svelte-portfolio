import * as m from '$lib/paraglide/messages';

interface NavItem {
	label: string;
	href: string;
}

export function getNavItems(): NavItem[] {
	return [
		{ label: m.nav_home(), href: '/#hero' },
		{ label: m.nav_skills(), href: '/#skills' },
		{ label: m.nav_projects(), href: '/#projects' },
		{ label: m.nav_experience(), href: '/#experience' },
		{ label: m.nav_contact(), href: '/#contact' },
	];
}
