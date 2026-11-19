<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { ArrowUpRight, Github, Globe, Search, X } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { formatDate, formatNumber } from '$lib/format';
	import { getTopicFilters, type Project, type ProjectRecord } from '$lib/projects';
	import * as m from '$lib/paraglide/messages';

	let {
		items,
		records = {}
	}: {
		items: Project[];
		records?: Record<string, ProjectRecord>;
	} = $props();

	type ViewTransitionDocument = Document & {
		startViewTransition?: (callback: () => void | Promise<void>) => {
			finished: Promise<void>;
		};
	};

	type Sort = 'recent' | 'name' | 'commits';

	const topics = getTopicFilters(8);
	const sortOptions: Array<{ id: Sort; label: () => string }> = [
		{ id: 'recent', label: m.projects_sort_recent },
		{ id: 'name', label: m.projects_sort_name },
		{ id: 'commits', label: m.projects_sort_commits }
	];

	let query = $state('');
	let topic = $state<string | null>(null);
	let sort = $state<Sort>('recent');
	// svelte-ignore state_referenced_locally
	let selected = $state<Project>(items[0]);
	let previewTitle = $state<HTMLElement>();
	let searchInput = $state<HTMLInputElement>();
	let transitioning = false;
	let previewTransitioning = $state(false);
	let reduceMotion = $state(false);
	let hoverTimer: ReturnType<typeof setTimeout> | null = null;

	const visible = $derived.by(() => {
		const needle = query.trim().toLowerCase();
		const matches = items.filter((project) => {
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

		if (sort === 'name') return matches.sort((a, b) => a.name.localeCompare(b.name));
		if (sort === 'commits') {
			return matches.sort(
				(a, b) => b.commitCount - a.commitCount || b.lastCommit.localeCompare(a.lastCommit)
			);
		}
		return matches;
	});

	const hasFilters = $derived(Boolean(query.trim()) || topic !== null);
	const countLabel = $derived(
		visible.length === 1 ? m.projects_count_one() : m.projects_count({ count: visible.length })
	);
	const selectedOrder = $derived(
		Math.max(0, items.findIndex((project) => project.slug === selected.slug)) + 1
	);
	const selectedRecord = $derived(records[selected.slug]);
	const previewLead = $derived.by(() => {
		const lead = selectedRecord?.lead;
		if (!lead) return '';
		const normalise = (value: string) =>
			value
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, ' ')
				.trim();
		const cleanLead = normalise(lead);
		const cleanDescription = normalise(selected.description);
		const limit = Math.min(cleanLead.length, cleanDescription.length, 60);
		let common = 0;
		while (common < limit && cleanLead[common] === cleanDescription[common]) common += 1;
		return common >= 24 ? '' : lead;
	});
	const selectedPlate = $derived(
		m.detail_plate({ index: selectedOrder, total: items.length })
	);
	const related = $derived.by(() => {
		const base = new Set(selected.topics);
		return items
			.filter((project) => project.slug !== selected.slug)
			.map((project) => ({
				project,
				shared: project.topics.filter((tag) => base.has(tag))
			}))
			.filter((entry) => entry.shared.length > 0)
			.sort(
				(a, b) =>
					b.shared.length - a.shared.length ||
					b.project.lastCommit.localeCompare(a.project.lastCommit)
			)
			.slice(0, 2);
	});

	$effect(() => {
		if (visible.length > 0 && !visible.some((project) => project.slug === selected.slug)) {
			selected = visible[0];
		}
	});

	onMount(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncMotion = () => (reduceMotion = media.matches);
		syncMotion();
		media.addEventListener('change', syncMotion);

		const onKeydown = (event: KeyboardEvent) => {
			if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
			const target = event.target as HTMLElement | null;
			if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
			event.preventDefault();
			searchInput?.focus();
			searchInput?.select();
		};
		window.addEventListener('keydown', onKeydown);

		return () => {
			media.removeEventListener('change', syncMotion);
			window.removeEventListener('keydown', onKeydown);
		};
	});

	onDestroy(() => {
		if (hoverTimer) clearTimeout(hoverTimer);
		if (typeof document === 'undefined') return;
		document.documentElement.classList.remove('preview-transition');
		document.querySelectorAll('.is-preview-vt').forEach((element) => {
			element.classList.remove('is-preview-vt');
		});
	});

	function pad(value: number): string {
		return String(value).padStart(2, '0');
	}

	function clear() {
		query = '';
		topic = null;
	}

	async function setSort(next: Sort) {
		if (next === sort) return;
		sort = next;
		await tick();
		if (visible.length > 0) selected = visible[0];
	}

	function displayTopics(project: Project): string[] {
		const tags = project.topics;
		if (!topic || !tags.includes(topic)) return tags.slice(0, 4);
		return [topic, ...tags.filter((tag) => tag !== topic)].slice(0, 4);
	}

	function onSearchKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		if (query) {
			query = '';
			event.preventDefault();
		} else {
			searchInput?.blur();
		}
	}

	function onIndexKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
		const list = (event.currentTarget as HTMLElement).closest('.index-list');
		const rows = [...(list?.querySelectorAll<HTMLAnchorElement>('.index-row') ?? [])];
		const current = rows.indexOf(document.activeElement as HTMLAnchorElement);
		if (current === -1) return;
		event.preventDefault();
		const next = Math.min(rows.length - 1, Math.max(0, current + (event.key === 'ArrowDown' ? 1 : -1)));
		rows[next]?.focus();
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

	function preview(project: Project, source: HTMLElement | null, pointerType?: string) {
		if (pointerType && pointerType !== 'mouse') return;
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

<section class="register-tools" aria-label={m.projects_filter()}>
	<div class="tools-main">
		<label class="search">
			<span class="sr-only">{m.projects_search()}</span>
			<Search aria-hidden="true" />
			<input
				bind:this={searchInput}
				type="search"
				bind:value={query}
				placeholder={m.projects_search_placeholder()}
				autocomplete="off"
				spellcheck="false"
				onkeydown={onSearchKeydown}
			/>
			<kbd aria-hidden="true">/</kbd>
		</label>

		<span class="tools-count" aria-live="polite">{countLabel}</span>

		<div class="sort" role="group" aria-label={m.projects_sort()}>
			<span class="sort-label">{m.projects_sort()}</span>
			{#each sortOptions as option (option.id)}
				<button
					type="button"
					aria-pressed={sort === option.id}
					onclick={() => setSort(option.id)}
				>
					{option.label()}
				</button>
			{/each}
		</div>
	</div>

	<div class="tools-filters">
		<span class="filter-label">{m.projects_filter()}</span>
		<div class="index-chips">
			<button type="button" class="chip" aria-pressed={topic === null} onclick={() => (topic = null)}>
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
			{#if hasFilters}
				<button type="button" class="chip chip-clear" onclick={clear}>
					<X size={11} aria-hidden="true" />
					{m.projects_clear()}
				</button>
			{/if}
		</div>
	</div>
</section>

<div class="projects-explorer">
	<div class="register-column">
		<div class="index-head" aria-hidden="true">
			<span>{m.projects_col_no()}</span>
			<span>{m.work_col_project()}</span>
			<span class="index-head-meta">{m.work_col_updated()}</span>
			<span></span>
		</div>

		<div class="index-list">
			{#each visible as project, position (project.slug)}
				{@const order = items.findIndex((item) => item.slug === project.slug) + 1}
				{@const active = project.slug === selected.slug}

				<a
					class="index-row"
					href={localizeHref(`/projects/${project.slug}`)}
					data-active={active}
					style={`--row-i: ${Math.min(position, 12)}`}
					animate:flip={{ duration: reduceMotion ? 0 : 200, easing: cubicOut }}
					onpointerenter={(event) => preview(project, titleIn(event.currentTarget), event.pointerType)}
					onfocus={(event) => select(project, titleIn(event.currentTarget), false)}
					onclick={(event) => armPageTitle(titleIn(event.currentTarget))}
					onkeydown={onIndexKeydown}
				>
					<span class="index-num">{pad(order)}</span>
					<span class="index-main">
						<span class="index-name">{project.name}</span>
						<span class="index-desc">{project.description}</span>
						<span class="index-tags">
							{#each displayTopics(project) as tag}<span>{tag}</span>{/each}
						</span>
					</span>
					<span class="index-meta">
						<span class="index-date">{formatDate(project.lastCommit)}</span>
						<span class="index-commits">
							{project.commitCount === 1
								? m.projects_commits_one()
								: m.projects_commits({ count: formatNumber(project.commitCount) })}
						</span>
					</span>
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
			<span class="index-hint">
				<span class="hint-desktop">{m.projects_preview_hint()}</span>
				<span class="hint-mobile">{m.projects_preview_hint_mobile()}</span>
			</span>
			<span class="mono">{visible.length} / {items.length}</span>
		</div>
	</div>

	<article
		class="project-preview"
		aria-label={m.projects_preview()}
		data-transitioning={previewTransitioning}
	>
		<div class="preview-rail" aria-hidden="true">
			<span class="rail-num">{pad(selectedOrder)}</span>
			<span class="rail-name">{m.projects_preview()}</span>
		</div>

		<div class="preview-sheet">
			<header class="preview-head">
				<span class="mono">{selectedPlate}</span>
				<span class="mono">
					{selected.language ?? m.detail_none()}
					{#if selected.license} · {selected.license}{/if}
				</span>
			</header>

			<h2 class="preview-title" bind:this={previewTitle}>{selected.name}</h2>

			{#key selected.slug}
				<div class="preview-body">
					<p class="preview-description">{selected.description}</p>

					<div class="preview-topics">
						{#each selected.topics as item}<span>{item}</span>{/each}
					</div>

					{#if selectedRecord?.note}
						<div class="preview-note">
							<span class="preview-label">{m.projects_status()}</span>
							<p>{selectedRecord.note}</p>
						</div>
					{/if}

					{#if previewLead}
						<div class="preview-excerpt">
							<span class="preview-label">{m.detail_readme()}</span>
							<p>{previewLead}</p>
						</div>
					{/if}

					{#if selectedRecord?.contents?.length}
						<div class="preview-contents">
							<span class="preview-label">{m.detail_contents()}</span>
							<span class="preview-contents-list">
								{#each selectedRecord.contents as heading, i (heading)}
									<span>{heading}{i < selectedRecord.contents.length - 1 ? ' /' : ''}</span>
								{/each}
							</span>
						</div>
					{/if}

					<dl class="preview-spec">
						<div>
							<dt>{m.detail_language()}</dt>
							<dd>{selected.language ?? m.detail_none()}</dd>
						</div>
						<div>
							<dt>{m.detail_license()}</dt>
							<dd>{selected.license ?? m.detail_none()}</dd>
						</div>
						<div>
							<dt>{m.detail_created()}</dt>
							<dd>{formatDate(selected.createdAt)}</dd>
						</div>
						<div>
							<dt>{m.detail_commits()}</dt>
							<dd>{formatNumber(selected.commitCount)}</dd>
						</div>
						<div>
							<dt>{m.detail_last_commit()}</dt>
							<dd>{formatDate(selected.lastCommit)}</dd>
						</div>
						<div>
							<dt>{m.detail_branch()}</dt>
							<dd>{selected.defaultBranch}</dd>
						</div>
					</dl>

					{#if related.length}
						<div class="preview-related">
							<span class="preview-label">{m.projects_related()}</span>
							{#each related as entry (entry.project.slug)}
								<a href={localizeHref(`/projects/${entry.project.slug}`)}>
									<span class="related-name">{entry.project.name}</span>
									<span class="related-topic">{entry.shared[0]}</span>
								</a>
							{/each}
						</div>
					{/if}

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
						{#if selected.homepage}
							<a
								class="btn btn-ghost"
								href={selected.homepage}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Globe size={15} aria-hidden="true" />
								{m.detail_live()}
							</a>
						{/if}
					</div>
				</div>
			{/key}
		</div>
	</article>
</div>
