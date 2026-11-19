<script lang="ts">
	import type { Project } from '$lib/projects';
	import ProjectRow from './project-row.svelte';
	import * as m from '$lib/paraglide/messages';

	let {
		items,
		startIndex = 0,
		head = true
	}: {
		items: Project[];
		startIndex?: number;
		head?: boolean;
	} = $props();
</script>

<div class="register">
	{#if head}
		<div class="register-head" aria-hidden="true">
			<span>ID</span>
			<span>{m.work_col_project()}</span>
			<span>{m.work_col_desc()}</span>
			<span>{m.work_col_stack()}</span>
			<span>{m.work_col_updated()}</span>
			<span>{m.work_col_commits()}</span>
		</div>
	{/if}

	{#each items as project, index (project.slug)}
		<ProjectRow {project} index={startIndex + index} />
	{:else}
		<p class="empty-state">{m.work_empty()}</p>
	{/each}
</div>
