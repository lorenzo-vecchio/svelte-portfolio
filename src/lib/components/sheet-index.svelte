<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	interface IndexItem {
		id: string;
		code: string;
		label: string;
	}

	let { items }: { items: IndexItem[] } = $props();

	let active = $state(0);
	let hidden = $state(false);
	let inverse = $state(false);

	onMount(() => {
		const sections = items
			.map((item) => document.getElementById(item.id))
			.filter((section): section is HTMLElement => Boolean(section));

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const index = sections.indexOf(entry.target as HTMLElement);
					if (index >= 0) active = index;
				}
			},
			{ rootMargin: '-32% 0px -58% 0px', threshold: 0 }
		);

		for (const section of sections) observer.observe(section);

		const footer = document.querySelector('.site-footer');
		const footerObserver = new IntersectionObserver(
			(entries) => {
				hidden = entries[0]?.isIntersecting ?? false;
			},
			{ threshold: 0, rootMargin: '0px 0px 160px 0px' }
		);
		if (footer) footerObserver.observe(footer);

		const contact = document.getElementById('contact');
		const contactObserver = new IntersectionObserver(
			(entries) => {
				inverse = entries[0]?.isIntersecting ?? false;
			},
			{ rootMargin: '-30% 0px -55% 0px', threshold: 0 }
		);
		if (contact) contactObserver.observe(contact);

		return () => {
			observer.disconnect();
			footerObserver.disconnect();
			contactObserver.disconnect();
		};
	});
</script>

<nav
	class="sheet-index"
	data-hidden={hidden}
	data-inverse={inverse}
	inert={hidden}
	aria-label={m.index_label()}
	style={`--index-progress:${((active + 1) / items.length) * 100}%`}
>
	<div class="sheet-index-head">
		<span class="sheet-index-title">{m.footer_nav()}</span>
		<span class="sheet-index-meta">01 / 01</span>
	</div>

	<div class="sheet-index-body">
		<span class="sheet-index-rail" aria-hidden="true"><i></i></span>
		<ol>
			{#each items as item, index (item.id)}
				<li data-active={index === active}>
					<a
						href={`#${item.id}`}
						aria-current={index === active ? 'true' : undefined}
					>
						<span class="idx-code">{item.code}</span>
						<span class="idx-label">{item.label}</span>
						<span class="idx-tick" aria-hidden="true"></span>
					</a>
				</li>
			{/each}
		</ol>
	</div>

	<div class="sheet-index-foot">Sheet 01 · Rev {__BUILD_REVISION__}</div>
</nav>

<style>
	.sheet-index {
		position: fixed;
		left: 24px;
		top: 50%;
		z-index: 40;
		width: 120px;
		transform: translateY(-50%);
		transition:
			opacity 0.3s var(--ease-out),
			transform 0.3s var(--ease-out);
	}

	.sheet-index-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem;
		padding-bottom: 0.45rem;
		margin-bottom: 0.55rem;
		border-bottom: 1px solid var(--rule-strong);
	}

	.sheet-index-title {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.sheet-index-meta {
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.08em;
		color: var(--ink-faint);
		white-space: nowrap;
	}

	.sheet-index-body {
		position: relative;
		padding-right: 14px;
	}

	.sheet-index-rail {
		position: absolute;
		right: 4px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--rule);
	}

	.sheet-index-rail i {
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		height: var(--index-progress, 0%);
		background: var(--accent);
		transition: height 0.5s var(--ease-out);
	}

	.sheet-index ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.sheet-index li {
		min-width: 0;
	}

	.sheet-index a {
		display: grid;
		grid-template-columns: 20px minmax(0, 1fr) 12px;
		align-items: center;
		gap: 6px;
		padding: 0.31rem 0;
		color: var(--ink-faint);
		transition: color 0.16s ease;
	}

	.idx-code {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.06em;
	}

	.idx-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.idx-tick {
		justify-self: end;
		width: 6px;
		height: 1px;
		background: currentColor;
		transition:
			width 0.2s var(--ease-out),
			background-color 0.2s ease;
	}

	.sheet-index a:hover {
		color: var(--ink);
	}

	.sheet-index li[data-active='true'] a {
		color: var(--ink);
	}

	.sheet-index li[data-active='true'] .idx-code {
		color: var(--accent-text);
		font-size: 11px;
		font-weight: 500;
	}

	.sheet-index li[data-active='true'] .idx-label {
		font-size: 11px;
		font-weight: 500;
	}

	.sheet-index li[data-active='true'] .idx-tick {
		width: 12px;
		background: var(--accent);
	}

	.sheet-index-foot {
		margin-top: 0.75rem;
		padding-top: 0.45rem;
		border-top: 1px solid var(--rule);
		font-family: var(--font-mono);
		font-size: 8px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.sheet-index[data-hidden='true'] {
		opacity: 0;
		transform: translateY(-50%) translateX(-8px);
		pointer-events: none;
	}

	.sheet-index[data-inverse='true'] .sheet-index-title,
	.sheet-index[data-inverse='true'] .sheet-index-meta,
	.sheet-index[data-inverse='true'] .sheet-index-foot {
		color: var(--band-soft);
	}

	.sheet-index[data-inverse='true'] .sheet-index-head,
	.sheet-index[data-inverse='true'] .sheet-index-foot {
		border-color: var(--band-rule);
	}

	.sheet-index[data-inverse='true'] .sheet-index-rail {
		background: var(--band-rule);
	}

	.sheet-index[data-inverse='true'] a {
		color: var(--band-soft);
	}

	.sheet-index[data-inverse='true'] a:hover,
	.sheet-index[data-inverse='true'] li[data-active='true'] a {
		color: var(--band-ink);
	}

	.sheet-index[data-inverse='true'] li[data-active='true'] .idx-code {
		color: var(--band-ink);
	}

	.sheet-index[data-inverse='true'] li[data-active='true'] .idx-tick {
		background: var(--accent);
	}

	@media (max-width: 1199px) {
		.sheet-index {
			display: none;
		}
	}
</style>
