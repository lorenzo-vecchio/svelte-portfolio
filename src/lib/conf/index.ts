import { getNavItems } from './navbar';
import { getExperiences } from './experience';
import type { ExperienceItem } from './experience';
import { getSkillCategories } from './skill';
import type { Skill, SkillCategory } from './skill';
import { contacts } from './contacts';
import { getProjectsEntries, getShowcaseProjectsEntries, isGroup, type Project, type ProjectEntry, type ProjectGroup } from './projects';

export {
	getNavItems,
	getExperiences,
	getSkillCategories,
	contacts,
	getProjectsEntries,
	getShowcaseProjectsEntries,
	isGroup,
	type ExperienceItem,
	type Skill,
	type SkillCategory,
	type Project,
	type ProjectEntry,
	type ProjectGroup
};
