<script lang="ts">
	import { projectCount, projects } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import ProjectExplorer from '$lib/components/project-explorer.svelte';
</script>

<div class="shell page-head">
	<div class="section-code">{m.index_register()} / 2026</div>
	<h1 use:reveal={{ scribe: true }}>{m.projects_title()}</h1>
	<p use:reveal={{ delay: 100 }}>{m.projects_intro({ count: projectCount })}</p>
	<div class="page-head-meta">
		<span>{m.projects_count({ count: projectCount })}</span>
		<span>{m.projects_topic_note()}</span>
	</div>
</div>

<div class="shell page-body">
	<ProjectExplorer items={projects} />
</div>

<style>
	.page-body {
		padding-bottom: var(--section-y);
	}
</style>
