<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { formatDate, formatNumber } from '$lib/format';
	import { getStack, type Project } from '$lib/projects';

	let {
		project,
		index,
		href
	}: {
		project: Project;
		index: number;
		href?: string;
	} = $props();

	const stack = $derived(getStack(project, 4));
	const target = $derived(href ?? localizeHref(`/projects/${project.slug}`));
	const date = $derived(formatDate(project.lastCommit));
	const commits = $derived(formatNumber(project.commitCount));

	function arm(row: HTMLElement) {
		for (const name of document.querySelectorAll('.row-name-text.is-vt')) {
			name.classList.remove('is-vt');
		}
		row.querySelector<HTMLElement>('.row-name-text')?.classList.add('is-vt');
	}
</script>

<a
	class="project-row"
	href={target}
	onpointerenter={(event) => arm(event.currentTarget)}
	onpointerdown={(event) => arm(event.currentTarget)}
	onfocus={(event) => arm(event.currentTarget)}
	onclick={(event) => arm(event.currentTarget)}
>
	<span class="row-idx">{String(index + 1).padStart(2, '0')}</span>
	<span class="row-name"><span class="row-name-text">{project.name}</span></span>
	<span class="row-desc">{project.description}</span>
	<span class="row-stack">
		{#each stack as topic}<span>{topic}</span>{/each}
	</span>
	<span class="row-date">{date}</span>
	<span class="row-commits">{commits}</span>
</a>
