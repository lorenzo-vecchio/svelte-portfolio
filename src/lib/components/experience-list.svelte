<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';

	const items = [
		{
			company: m.exp_its_company(),
			role: m.exp_its_role(),
			period: m.exp_its_period(),
			desc: m.exp_its_desc(),
			tags: ['Java', 'JavaScript', 'SQL', 'React', 'Vue', 'Angular', 'Spring Boot', 'Python'],
			now: false
		},
		{
			company: m.exp_nexid_company(),
			role: m.exp_nexid_role(),
			period: m.exp_nexid_period(),
			desc: m.exp_nexid_desc(),
			tags: ['React', '4D Orda'],
			now: false
		},
		{
			company: m.exp_alten_company(),
			role: m.exp_alten_role(),
			period: m.exp_alten_period(),
			desc: m.exp_alten_desc(),
			tags: ['Spring Boot', 'SvelteKit', 'Express.js', 'Socket.IO', 'Angular'],
			now: false
		},
		{
			company: m.exp_pwc_company(),
			role: m.exp_pwc_role(),
			period: m.exp_pwc_period(),
			desc: m.exp_pwc_desc(),
			tags: ['Enterprise', 'Consulting'],
			now: true
		}
	];
</script>

<div class="experience" use:reveal>
	{#each items as item}
		<article class="exp-row">
			<div class="exp-years">
				{item.period}
				{#if item.now}<span class="exp-now">{m.experience_now()}</span>{/if}
			</div>
			<div class="exp-main">
				<h3>{item.role}</h3>
				<p class="exp-company">{item.company}</p>
				<p class="exp-desc">{item.desc}</p>
				<div class="exp-tags">
					{#each item.tags as tag}<span>{tag}</span>{/each}
				</div>
			</div>
		</article>
	{/each}
</div>

<style>
	.exp-now {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		margin-left: 0.5rem;
		color: var(--accent-text);
	}

	.exp-now::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--accent);
	}
</style>
