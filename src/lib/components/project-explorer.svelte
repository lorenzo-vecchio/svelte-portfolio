<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';
	import { formatDate } from '$lib/format';
	import { getLatestCommitDate, getTopicFilters, type Project } from '$lib/projects';
	import ProjectRegister from './project-register.svelte';
	import * as m from '$lib/paraglide/messages';

	let { items }: { items: Project[] } = $props();

	const topics = getTopicFilters(12);
	const latest = $derived(formatDate(getLatestCommitDate()));

	let query = $state('');
	let topic = $state<string | null>(null);

	const filtered = $derived.by(() => {
		const needle = query.trim().toLowerCase();
		return items.filter((project) => {
			const matchesTopic = !topic || project.topics.includes(topic);
			if (!matchesTopic) return false;
			if (!needle) return true;
			return (
				project.name.toLowerCase().includes(needle) ||
				project.description.toLowerCase().includes(needle) ||
				(project.language?.toLowerCase().includes(needle) ?? false) ||
				project.topics.some((item) => item.includes(needle))
			);
		});
	});

	const hasFilters = $derived(Boolean(query.trim()) || topic !== null);
	const countLabel = $derived(
		filtered.length === 1
			? m.projects_count_one()
			: m.projects_count({ count: filtered.length })
	);

	function clear() {
		query = '';
		topic = null;
	}
</script>

<div class="filters">
	<div class="filter-row">
		<label class="search">
			<span class="sr-only">{m.projects_search()}</span>
			<Search aria-hidden="true" />
			<input
				type="search"
				bind:value={query}
				placeholder={m.projects_search_placeholder()}
				autocomplete="off"
				spellcheck="false"
			/>
		</label>
		{#if hasFilters}
			<button type="button" class="chip" onclick={clear}>
				<X size={11} aria-hidden="true" />
				{m.projects_clear()}
			</button>
		{/if}
	</div>

	<div class="filter-row">
		<span class="filter-label">{m.projects_filter()}</span>
		<button
			type="button"
			class="chip"
			aria-pressed={topic === null}
			onclick={() => (topic = null)}
		>
			{m.projects_all()}
			<small>{items.length}</small>
		</button>
		{#each topics as entry (entry.topic)}
			<button
				type="button"
				class="chip"
				aria-pressed={topic === entry.topic}
				onclick={() => (topic = topic === entry.topic ? null : entry.topic)}
			>
				{entry.topic}
				<small>{entry.count}</small>
			</button>
		{/each}
	</div>
</div>

<div class="results-line" aria-live="polite">
	<span>{countLabel}</span>
	<span>{m.projects_updated()}: {latest}</span>
</div>

{#if filtered.length > 0}
	<ProjectRegister items={filtered} />
{:else}
	<div class="empty-state">
		<p>{m.projects_empty()}</p>
		<button type="button" class="btn btn-ghost" onclick={clear}>{m.projects_clear()}</button>
	</div>
{/if}
