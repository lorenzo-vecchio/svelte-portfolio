import * as m from '$lib/paraglide/messages';

export interface ExperienceItem {
	company: string;
	role: string;
	period: string;
	location: string;
	description: string[];
	technologies?: string[];
	type: 'work' | 'education' | 'project';
}

export function getExperiences(): ExperienceItem[] {
	return [
		{
			company: 'ITS Academy Angelo Rizzoli',
			role: m.exp_its_role(),
			period: 'Sep 2021 - Jul 2023',
			location: 'Milan, Italy',
			description: [
				m.exp_its_desc_0(),
				m.exp_its_desc_1(),
				m.exp_its_desc_2(),
			],
			technologies: ['Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React', 'Vue.js', 'Angular', 'iOS', 'Android', 'Windows', 'Spring Boot', 'Python'],
			type: 'education'
		},
		{
			company: 'NEXiD',
			role: m.exp_nexid_role(),
			period: 'Jan 2024 - Oct 2024',
			location: 'Milan, Italy',
			description: [
				m.exp_nexid_desc_0(),
				m.exp_nexid_desc_1(),
				m.exp_nexid_desc_2(),
			],
			technologies: ['React', '4D Orda'],
			type: 'work'
		},
		{
			company: 'ALTEN Italia',
			role: m.exp_alten_role(),
			period: 'Oct 2024 - Oct 2025',
			location: 'Milan, Italy',
			description: [
				m.exp_alten_desc_0(),
				m.exp_alten_desc_1(),
				m.exp_alten_desc_2(),
				m.exp_alten_desc_3(),
			],
			technologies: ['Spring Boot', 'SvelteKit', 'Express.js', 'Socket.IO', 'Angular'],
			type: 'work'
		},
		{
			company: 'PwC Italy',
			role: m.exp_pwc_role(),
			period: 'Nov 2025 - Present',
			location: 'Milan, Italy',
			description: [m.exp_pwc_desc_0()],
			technologies: ['Enterprise', 'Consulting'],
			type: 'work'
		},
	];
}
