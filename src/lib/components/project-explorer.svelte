<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { ArrowUpRight, Github, Search, X } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { formatDate, formatNumber } from '$lib/format';
	import { getLatestCommitDate, getTopicFilters, type Project } from '$lib/projects';
	import * as m from '$lib/paraglide/messages';

	let { items }: { items: Project[] } = $props();

	type ViewTransitionDocument = Document & {
		startViewTransition?: (callback: () => void | Promise<void>) => {
			finished: Promise<void>;
		};
	};

	const topics = getTopicFilters(8);
	const latest = formatDate(getLatestCommitDate());

	let query = $state('');
	let topic = $state<string | null>(null);
	// svelte-ignore state_referenced_locally
	let selected = $state<Project>(items[0]);
	let previewTitle = $state<HTMLElement>();
	let transitioning = false;
	let previewTransitioning = $state(false);
	let hoverTimer: ReturnType<typeof setTimeout> | null = null;

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
	const selectedOrder = $derived(
		Math.max(0, items.findIndex((project) => project.slug === selected.slug)) + 1
	);
	const selectedPlate = $derived(
		m.detail_plate({ index: selectedOrder, total: items.length })
	);

	$effect(() => {
		if (filtered.length > 0 && !filtered.some((project) => project.slug === selected.slug)) {
			selected = filtered[0];
		}
	});

	onDestroy(() => {
		if (hoverTimer) clearTimeout(hoverTimer);
		if (typeof document === 'undefined') return;
		document.documentElement.classList.remove('preview-transition');
		document.querySelectorAll('.is-preview-vt').forEach((element) => {
			element.classList.remove('is-preview-vt');
		});
	});

	function clear() {
		query = '';
		topic = null;
	}

	function titleIn(row: HTMLElement): HTMLElement | null {
		return row.querySelector<HTMLElement>('.index-name');
	}

	function armPageTitle(source: HTMLElement | null) {
		if (!source) return;
		document.querySelectorAll('.is-preview-vt').forEach((element) => {
			element.classList.remove('is-preview-vt');
		});
		document.querySelectorAll('.index-name.is-vt').forEach((element) => {
			element.classList.remove('is-vt');
		});
		source.classList.add('is-vt');
	}

	function preview(project: Project, source: HTMLElement | null) {
		if (!source) return;
		if (hoverTimer) clearTimeout(hoverTimer);
		hoverTimer = setTimeout(() => select(project, source, true), 80);
	}

	function select(project: Project, source: HTMLElement | null, animate: boolean) {
		if (hoverTimer) clearTimeout(hoverTimer);
		if (!source || project.slug === selected.slug) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const desktop = window.matchMedia('(min-width: 1024px)').matches;
		const doc = document as ViewTransitionDocument;

		if (!animate || reduce || !desktop || !doc.startViewTransition || transitioning || !previewTitle) {
			selected = project;
			return;
		}

		transitioning = true;
		previewTransitioning = true;
		document.querySelectorAll('.is-preview-vt').forEach((element) => {
			element.classList.remove('is-preview-vt');
		});
		source.classList.add('is-preview-vt');
		document.documentElement.classList.add('preview-transition');

		try {
			const transition = doc.startViewTransition(async () => {
				selected = project;
				await tick();
				source.classList.remove('is-preview-vt');
				previewTitle?.classList.add('is-preview-vt');
			});

			transition.finished.finally(() => {
				transitioning = false;
				previewTransitioning = false;
				previewTitle?.classList.remove('is-preview-vt');
				document.documentElement.classList.remove('preview-transition');
			});
		} catch {
			transitioning = false;
			previewTransitioning = false;
			source.classList.remove('is-preview-vt');
			document.documentElement.classList.remove('preview-transition');
			selected = project;
		}
	}
</script>

<div class="projects-explorer">
	<section
		class="project-preview"
		aria-label={m.projects_preview()}
		data-transitioning={previewTransitioning}
	>
		<div class="preview-kicker">
			<span class="mono">{m.projects_preview()} / {String(selectedOrder).padStart(2, '0')}</span>
			<span class="mono">{selectedPlate}</span>
		</div>

		<span class="preview-number" aria-hidden="true">
			{String(selectedOrder).padStart(2, '0')}
		</span>

		<h2 class="preview-title" bind:this={previewTitle}>{selected.name}</h2>

		{#key selected.slug}
			<div class="preview-body">
				<p class="preview-description">{selected.description}</p>

				<div class="preview-topics">
					{#each selected.topics as item}<span>{item}</span>{/each}
				</div>

				<dl class="preview-meta">
					<div>
						<dt>{m.detail_language()}</dt>
						<dd>{selected.language ?? m.detail_none()}</dd>
					</div>
					<div>
						<dt>{m.detail_last_commit()}</dt>
						<dd>{formatDate(selected.lastCommit)}</dd>
					</div>
					<div>
						<dt>{m.detail_commits()}</dt>
						<dd>{formatNumber(selected.commitCount)}</dd>
					</div>
				</dl>

				<div class="preview-actions">
					<a class="btn" href={localizeHref(`/projects/${selected.slug}`)}>
						{m.projects_open_plate()}
						<ArrowUpRight size={15} aria-hidden="true" />
					</a>
					<a
						class="btn btn-ghost"
						href={selected.repository}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Github size={15} aria-hidden="true" />
						GitHub
					</a>
				</div>
			</div>
		{/key}
	</section>

	<aside class="project-index" aria-label={m.projects_index()}>
		<div class="index-head">
			<div class="index-kicker">
				<span class="mono">{m.projects_index()}</span>
				<span class="mono">{countLabel}</span>
			</div>

			<div class="index-tools">
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

			<div class="index-filters">
				<span class="filter-label">{m.projects_filter()}</span>
				<div class="index-chips">
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

			<p class="index-hint">
				<span class="hint-desktop">{m.projects_preview_hint()}</span>
				<span class="hint-mobile">{m.projects_preview_hint_mobile()}</span>
			</p>
		</div>

		<div class="index-list">
			{#each filtered as project (project.slug)}
				{@const order = items.findIndex((item) => item.slug === project.slug) + 1}
				{@const active = project.slug === selected.slug}

				<a
					class="index-row"
					href={localizeHref(`/projects/${project.slug}`)}
					data-active={active}
					onpointerenter={(event) => preview(project, titleIn(event.currentTarget))}
					onfocus={(event) => select(project, titleIn(event.currentTarget), false)}
					onclick={(event) => armPageTitle(titleIn(event.currentTarget))}
				>
					<span class="index-num">{String(order).padStart(2, '0')}</span>
					<span class="index-main">
						<span class="index-name">{project.name}</span>
						<span class="index-date-mobile">{formatDate(project.lastCommit)}</span>
						<span class="index-desc">{project.description}</span>
						<span class="index-tags">
							{#each project.topics.slice(0, 4) as tag}<span>{tag}</span>{/each}
						</span>
					</span>
					<span class="index-date">{formatDate(project.lastCommit)}</span>
					<span class="index-arrow" aria-hidden="true">↗</span>
				</a>
			{:else}
				<div class="index-empty">
					<p>{m.projects_empty()}</p>
					<button type="button" class="btn btn-ghost" onclick={clear}>
						{m.projects_clear()}
					</button>
				</div>
			{/each}
		</div>

		<div class="index-foot">
			<span>{m.projects_updated()}: {latest}</span>
		</div>
	</aside>
</div>
