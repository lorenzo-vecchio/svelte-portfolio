<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate, formatNumber } from '$lib/format';
	import { getLatestCommitDate, projectCount, projects } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';
	import ProjectExplorer from '$lib/components/project-explorer.svelte';

	let { data }: { data: PageData } = $props();

	const languageCount = new Set(projects.map((project) => project.language).filter(Boolean)).size;
	const topicCount = new Set(projects.flatMap((project) => project.topics)).size;
	const latest = formatDate(getLatestCommitDate());
</script>

<div class="shell page-head">
	<div class="page-head-main">
		<div class="section-code">{m.index_register()} / 2026</div>
		<h1 use:reveal={{ scribe: true }}>{m.projects_title()}</h1>
		<p use:reveal={{ delay: 100 }}>{m.projects_intro({ count: projectCount })}</p>
	</div>

	<dl class="page-head-spec" use:reveal={{ delay: 180 }}>
		<div>
			<dt>{m.projects_spec_projects()}</dt>
			<dd>{formatNumber(projectCount)}</dd>
		</div>
		<div>
			<dt>{m.projects_spec_languages()}</dt>
			<dd>{formatNumber(languageCount)}</dd>
		</div>
		<div>
			<dt>{m.projects_spec_topics()}</dt>
			<dd>{formatNumber(topicCount)}</dd>
		</div>
		<div>
			<dt>{m.projects_updated()}</dt>
			<dd>{latest}</dd>
		</div>
	</dl>
</div>

<div class="shell page-body">
	<ProjectExplorer items={projects} records={data.records} />
</div>

<style>
	.page-body {
		padding-bottom: var(--section-y);
	}
</style>
