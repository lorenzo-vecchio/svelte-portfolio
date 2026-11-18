<script lang="ts">
	import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { formatDate, formatLongDate, formatNumber } from '$lib/format';
	import { getProjectNeighbours, projectCount } from '$lib/projects';
	import { enhanceCode } from '$lib/actions/code-copy';
	import * as m from '$lib/paraglide/messages';

	let { data } = $props();

	const project = $derived(data.project);
	const readme = $derived(data.readme);
	const neighbours = $derived(getProjectNeighbours(project.slug));
	const total = projectCount;
	const created = $derived(formatDate(project.createdAt));
	const lastCommit = $derived(formatDate(project.lastCommit));
	const lastCommitLong = $derived(formatLongDate(project.lastCommit));
	const commits = $derived(formatNumber(project.commitCount));
	const stars = $derived(formatNumber(project.stars));
</script>

<div class="shell detail-head">
	<a class="back-link" href={localizeHref('/projects')}>
		<ArrowLeft size={13} aria-hidden="true" />
		{m.detail_back()}
	</a>

	<div class="detail-title-row">
		<h1 class="detail-title">{project.name}</h1>
		<span class="detail-plate">
			{m.detail_plate({ index: neighbours.index + 1, total })}
		</span>
	</div>

	<p class="detail-lead">{project.description}</p>

	<div class="detail-topics">
		{#each project.topics as topic}<span>{topic}</span>{/each}
	</div>

	<div class="detail-actions">
		<a
			class="btn"
			href={project.repository}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Github size={15} aria-hidden="true" />
			{m.detail_open_github()}
			<ArrowUpRight size={14} aria-hidden="true" />
		</a>
		{#if project.homepage}
			<a
				class="btn btn-ghost"
				href={project.homepage}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Globe size={15} aria-hidden="true" />
				{m.detail_live()}
				<ArrowUpRight size={14} aria-hidden="true" />
			</a>
		{/if}
	</div>
</div>

<div class="shell detail-layout">
	<div class="detail-main">
		<div class="detail-main-head">
			<span>{m.detail_readme()}</span>
			<span>{m.detail_last_commit()}: {lastCommit}</span>
		</div>

		{#if readme.html}
			<article
				class="readme"
				aria-label={m.detail_readme()}
				use:enhanceCode={{
					copyLabel: m.common_copy(),
					copiedLabel: m.common_copied()
				}}
			>
				{@html readme.html}
			</article>
		{:else}
			<div class="empty-state">
				<p>{m.detail_no_readme()}</p>
				<a
					class="btn btn-ghost"
					href={project.repository}
					target="_blank"
					rel="noopener noreferrer"
				>
					{m.detail_open_github()}
					<ArrowUpRight size={14} aria-hidden="true" />
				</a>
			</div>
		{/if}

		<div class="detail-next">
			<a href={localizeHref(`/projects/${neighbours.previous.slug}`)}>
				<span><ArrowLeft size={12} aria-hidden="true" /> {m.detail_previous()}</span>
				<strong>{neighbours.previous.name}</strong>
			</a>
			<a href={localizeHref(`/projects/${neighbours.next.slug}`)}>
				<span>{m.detail_next()} <ArrowRight size={12} aria-hidden="true" /></span>
				<strong>{neighbours.next.name}</strong>
			</a>
		</div>
	</div>

	<aside class="detail-rail">
		<div class="title-card">
			<div class="title-card-head">{m.detail_metadata()}</div>
			<dl>
				<div class="title-card-row">
					<dt>{m.detail_repository()}</dt>
					<dd>
						<a href={project.repository} target="_blank" rel="noopener noreferrer">
							lorenzo-vecchio/{project.name}
						</a>
					</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_language()}</dt>
					<dd>{project.language ?? m.detail_none()}</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_license()}</dt>
					<dd>{project.license ?? m.detail_none()}</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_created()}</dt>
					<dd>{created}</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_last_commit()}</dt>
					<dd title={lastCommitLong}>{lastCommit}</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_commits()}</dt>
					<dd>{commits}</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_stars()}</dt>
					<dd>{stars}</dd>
				</div>
				<div class="title-card-row">
					<dt>{m.detail_topics()}</dt>
					<dd>{project.topics.join(', ') || m.detail_none()}</dd>
				</div>
			</dl>
		</div>

		{#if readme.toc.length > 2}
			<nav class="toc" aria-label={m.detail_contents()}>
				<h2>{m.detail_contents()}</h2>
				<ul>
					{#each readme.toc as entry}
						<li data-level={entry.level}>
							<a href={`#${entry.id}`}>{entry.text}</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}

		<p class="detail-source">{m.detail_source_note()}</p>
	</aside>
</div>

<style>
	.detail-topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem 0.75rem;
		margin-top: 1rem;
		font-family: var(--font-mono);
		font-size: 10px;
		line-height: 1.5;
		color: var(--ink-faint);
	}

	.detail-topics span::after {
		content: ' /';
		color: var(--rule-strong);
	}

	.detail-topics span:last-child::after {
		content: '';
	}

	@media (max-width: 1023px) {
		.detail-rail {
			order: -1;
		}
	}
</style>
