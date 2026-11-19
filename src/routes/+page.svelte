<script lang="ts">
	import { ArrowUpRight, ChevronDown, Github, Linkedin, Mail } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { contacts } from '$lib/contacts';
	import { getRecentProjects, projectCount } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';
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
		{ id: 'intro', code: '00', label: m.index_intro() },
		{ id: 'about', code: '01', label: m.index_profile() },
		{ id: 'toolkit', code: '02', label: m.index_toolkit() },
		{ id: 'work', code: '03', label: m.index_register() },
		{ id: 'experience', code: '04', label: m.index_record() },
		{ id: 'field', code: '05', label: m.index_field() },
		{ id: 'contact', code: '06', label: m.index_contact() }
	];

	type KitGroup = { code: string; title: string; items: string[] };

	const toolkit: KitGroup[] = [
		{
			code: '01',
			title: m.toolkit_group_interface(),
			items: ['TypeScript', 'SvelteKit', 'React', 'Angular', 'Vue.js', 'Next.js', 'Tailwind CSS', 'Flutter']
		},
		{
			code: '02',
			title: m.toolkit_group_service(),
			items: ['Node.js', 'Spring Boot', 'Go', 'Python', 'Django', 'FastAPI', 'Express', 'Socket.IO']
		},
		{
			code: '03',
			title: m.toolkit_group_data(),
			items: ['SQL', 'PostgreSQL', 'SQLite', '4D Orda']
		},
		{
			code: '04',
			title: m.toolkit_group_infra(),
			items: ['Docker', 'Docker Swarm', 'Kubernetes', 'Nginx', 'Linux', 'Git', 'CI/CD']
		},
		{
			code: '05',
			title: m.toolkit_group_craft(),
			items: ['Software architecture', 'Testing', 'AI-assisted development', 'Agile / Scrum']
		},
		{
			code: '06',
			title: m.toolkit_group_languages(),
			items: [m.toolkit_italian(), m.toolkit_english()]
		}
	];
</script>

{#snippet kitBlock(group: KitGroup, order: number)}
	<article class="kit-block" use:reveal={{ delay: order * 65 }}>
		<header class="kit-head">
			<span class="kit-code">{group.code}</span>
			<h3>{group.title}</h3>
			<span class="kit-count">{String(group.items.length).padStart(2, '0')}</span>
		</header>
		<ul class="kit-tools">
			{#each group.items as item, index}
				<li style={`--i: ${index}`}>{item}</li>
			{/each}
		</ul>
	</article>
{/snippet}

<div class="home-sheet">
<SheetIndex items={indexItems} />

<section id="intro" class="hero">
	<div class="hero-crosshair" aria-hidden="true"></div>

	<div class="shell hero-inner">
		<div class="hero-topline">
			<span>Portfolio / Rev. {__BUILD_REVISION__}</span>
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

	<div class="kit">
		<div class="kit-grid">
			{#each toolkit.slice(0, 4) as group, index (group.code)}
				{@render kitBlock(group, index)}
			{/each}
		</div>

		<aside class="kit-side">
			{#each toolkit.slice(4) as group, index (group.code)}
				{@render kitBlock(group, index + 4)}
			{/each}
			<p class="kit-note" use:reveal={{ delay: 420 }}>{m.toolkit_now()}</p>
		</aside>
	</div>
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

</div>
