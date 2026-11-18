<script lang="ts">
	import { ArrowUpRight, ChevronDown, Github, Linkedin, Mail } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { contacts } from '$lib/contacts';
	import { getRecentProjects, projectCount } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';
	import { parallax } from '$lib/actions/parallax';
	import * as m from '$lib/paraglide/messages';
	import SectionHead from '$lib/components/section-head.svelte';
	import SystemPlate from '$lib/components/system-plate.svelte';
	import LabDiagram from '$lib/components/lab-diagram.svelte';
	import ProjectRegister from '$lib/components/project-register.svelte';
	import ExperienceList from '$lib/components/experience-list.svelte';
	import FieldNotes from '$lib/components/field-notes.svelte';
	import Clock from '$lib/components/clock.svelte';
	import SheetIndex from '$lib/components/sheet-index.svelte';

	const recent = getRecentProjects(6);

	const indexItems = [
		{ id: 'about', code: '01', label: m.index_profile() },
		{ id: 'toolkit', code: '02', label: m.index_toolkit() },
		{ id: 'work', code: '03', label: m.index_register() },
		{ id: 'experience', code: '04', label: m.index_record() },
		{ id: 'field', code: '05', label: m.index_field() },
		{ id: 'contact', code: '06', label: m.index_contact() }
	];

	const toolkit = [
		{
			title: m.toolkit_group_interface(),
			items: ['TypeScript', 'SvelteKit', 'React', 'Angular', 'Vue.js', 'Tailwind CSS', 'Flutter']
		},
		{
			title: m.toolkit_group_service(),
			items: ['Node.js', 'Spring Boot', 'Go', 'Python', 'Django', 'FastAPI', 'Socket.IO']
		},
		{
			title: m.toolkit_group_data(),
			items: ['SQL', 'PostgreSQL', 'SQLite', '4D Orda']
		},
		{
			title: m.toolkit_group_infra(),
			items: ['Docker', 'Docker Swarm', 'Kubernetes', 'Nginx', 'Linux', 'Git', 'CI/CD']
		},
		{
			title: m.toolkit_group_craft(),
			items: ['Software architecture', 'Testing', 'AI-assisted development', 'Agile / Scrum']
		},
		{
			title: m.toolkit_group_languages(),
			items: [m.toolkit_italian(), m.toolkit_english()]
		}
	];
</script>

<section class="hero">
	<div class="hero-grid" use:parallax={34} aria-hidden="true"></div>
	<div class="hero-crosshair" aria-hidden="true"></div>

	<div class="shell hero-inner">
		<div class="hero-topline">
			<span>Portfolio / Rev. 2026.11</span>
			<span>45.4642° N / 9.1900° E</span>
		</div>

		<div class="hero-main">
			<div>
				<h1 class="hero-title">
					<span>Lorenzo</span>
					<span class="line-two">Vecchio</span>
				</h1>

				<div class="hero-lead-block">
					<p class="hero-lead">{m.hero_lead()}</p>
					<div class="hero-actions">
						<a class="btn" href={localizeHref('/projects')}>
							{m.hero_cta_work()}
							<ArrowUpRight class="arrow" size={15} aria-hidden="true" />
						</a>
						<a class="btn btn-ghost" href={contacts.emailHref}>
							{m.hero_cta_contact()}
						</a>
					</div>
				</div>

				<div class="hero-scroll">
					<ChevronDown size={12} aria-hidden="true" />
					<span>{m.hero_scroll()}</span>
				</div>
			</div>

			<div class="hero-plate-wrap">
				<SystemPlate />
			</div>
		</div>
	</div>

	<div class="shell">
		<dl class="hero-spec">
			<div class="spec-cell">
				<dt>{m.spec_role()}</dt>
				<dd>{m.hero_role()}</dd>
			</div>
			<div class="spec-cell">
				<dt>{m.spec_base()}</dt>
				<dd>{m.about_fact_base()}</dd>
			</div>
			<div class="spec-cell">
				<dt>{m.spec_status()}</dt>
				<dd>{m.spec_status_value()}</dd>
			</div>
			<div class="spec-cell">
				<dt>{m.spec_local_time()}</dt>
				<dd><Clock /></dd>
			</div>
		</dl>
	</div>
</section>

<section id="about" class="section shell">
	<SectionHead
		code={`01 / ${m.index_profile()}`}
		title={m.about_title()}
		intro={m.about_intro()}
	/>

	<div class="about-grid">
		<div class="about-copy" use:reveal>
			<p>{m.about_p1()}</p>
			<p>{m.about_p2()}</p>
			<p>{m.about_p3()}</p>

			<dl class="about-facts">
				<div class="about-fact">
					<dt>{m.spec_role()}</dt>
					<dd>{m.about_fact_role()}</dd>
				</div>
				<div class="about-fact">
					<dt>{m.spec_base()}</dt>
					<dd>{m.about_fact_base()}</dd>
				</div>
				<div class="about-fact">
					<dt>{m.about_fact_at_label()}</dt>
					<dd>{m.about_fact_at()}</dd>
				</div>
				<div class="about-fact">
					<dt>{m.about_fact_focus_label()}</dt>
					<dd>{m.about_fact_focus()}</dd>
				</div>
			</dl>
		</div>

		<aside class="lab" use:reveal={{ delay: 120 }}>
			<div class="lab-head">
				<strong>{m.lab_title()}</strong>
				<span>LAB / 01</span>
			</div>
			<p>{m.lab_body()}</p>
			<LabDiagram />
			<p class="lab-note">{m.lab_note()}</p>
		</aside>
	</div>
</section>

<section id="toolkit" class="section shell">
	<SectionHead
		code={`02 / ${m.index_toolkit()}`}
		title={m.toolkit_title()}
		intro={m.toolkit_intro()}
	/>

	<div class="toolkit-grid" use:reveal>
		{#each toolkit as group}
			<div class="toolkit-group">
				<h3>{group.title}</h3>
				<div class="toolkit-items">
					{#each group.items as item}<span class="toolkit-item">{item}</span>{/each}
				</div>
			</div>
		{/each}
	</div>
	<p class="toolkit-note">{m.toolkit_now()}</p>
</section>

<section id="work" class="section shell">
	<SectionHead
		code={`03 / ${m.index_register()}`}
		title={m.work_title()}
		intro={m.work_intro()}
	/>

	<ProjectRegister items={recent} />

	<div class="register-foot">
		<span class="register-note">{m.work_sorted()}</span>
		<a class="u-link" href={localizeHref('/projects')}>
			{m.work_open_all({ count: projectCount })} →
		</a>
	</div>
</section>

<section id="experience" class="section shell">
	<SectionHead
		code={`04 / ${m.index_record()}`}
		title={m.experience_title()}
		intro={m.experience_intro()}
	/>
	<ExperienceList />
</section>

<section id="field" class="section shell">
	<SectionHead
		code={`05 / ${m.index_field()}`}
		title={m.field_title()}
		intro={m.field_intro()}
	/>
	<FieldNotes />
</section>

<SheetIndex items={indexItems} />

<section id="contact" class="contact-band">
	<div class="shell contact-grid">
		<div>
			<div class="section-code" use:reveal>06 / {m.index_contact()}</div>
			<h2 use:reveal={{ scribe: true }}>{m.contact_title()}</h2>
			<p use:reveal={{ delay: 120 }}>{m.contact_body()}</p>
		</div>

		<div class="contact-actions" use:reveal={{ delay: 200 }}>
			<a class="contact-email" href={contacts.emailHref}>
				<Mail size={20} strokeWidth={1.5} aria-hidden="true" />
				{contacts.email}
				<ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
			</a>
			<div class="contact-meta">
				<span>{m.contact_availability()}</span>
			</div>
			<div class="contact-socials">
				<a href={contacts.github} target="_blank" rel="noopener noreferrer">
					<Github size={15} aria-hidden="true" /> GitHub
				</a>
				<a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
					<Linkedin size={15} aria-hidden="true" /> LinkedIn
				</a>
			</div>
		</div>
	</div>
</section>
