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
	let visible = $state(false);

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

		let footerVisible = false;
		const footer = document.querySelector('.site-footer');
		const footerObserver = new IntersectionObserver(
			(entries) => {
				footerVisible = entries[0]?.isIntersecting ?? false;
				onScroll();
			},
			{ threshold: 0 }
		);
		if (footer) footerObserver.observe(footer);

		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				visible = window.scrollY > window.innerHeight * 0.55 && !footerVisible;
			});
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		return () => {
			observer.disconnect();
			footerObserver.disconnect();
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<nav
	class="sheet-index"
	data-visible={visible}
	aria-label={m.index_label()}
	style={`--index-progress:${((active + 1) / items.length) * 100}%`}
>
	<span class="sheet-index-title" aria-hidden="true">{m.footer_nav()}</span>
	<span class="sheet-index-rail" aria-hidden="true"><i></i></span>
	<ul>
		{#each items as item, index (item.id)}
			<li data-active={index === active}>
				<a
					href={`#${item.id}`}
					aria-current={index === active ? 'true' : undefined}
					title={item.label}
				>
					<span class="idx-code">{item.code}</span>
					<span class="idx-label">{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.sheet-index {
		position: fixed;
		right: 11px;
		top: 50%;
		z-index: 40;
		transform: translateY(-50%) translateX(8px);
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.35s var(--ease-out),
			transform 0.35s var(--ease-out);
	}

	.sheet-index[data-visible='true'] {
		opacity: 1;
		transform: translateY(-50%);
		pointer-events: auto;
	}

	.sheet-index-title {
		display: block;
		text-align: right;
		font-family: var(--font-mono);
		font-size: 7px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-faint);
		padding-right: 9px;
		margin-bottom: 7px;
	}

	.sheet-index-rail {
		position: absolute;
		right: 3px;
		top: 24px;
		bottom: 0;
		width: 1px;
		background: var(--rule-strong);
	}

	.sheet-index-rail i {
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		height: var(--index-progress, 0%);
		background: var(--accent);
		transition: height 0.45s var(--ease-out);
	}

	.sheet-index ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.sheet-index li {
		position: relative;
		display: flex;
		justify-content: flex-end;
	}

	.sheet-index a {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 34px;
		height: 18px;
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.06em;
		color: var(--ink-soft);
		transition: color 0.16s ease;
	}

	.sheet-index a::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		width: 8px;
		height: 1px;
		background: currentColor;
		transform: translateY(-50%);
	}

	.sheet-index a:hover,
	.sheet-index a[aria-current='true'] {
		color: var(--ink);
	}

	.sheet-index li[data-active='true'] a {
		color: var(--accent-text);
	}

	.sheet-index li[data-active='true'] a::after {
		width: 11px;
	}

	.idx-label {
		position: absolute;
		right: 26px;
		top: 50%;
		transform: translate(4px, -50%);
		opacity: 0;
		pointer-events: none;
		white-space: nowrap;
		font-size: 9px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-soft);
		background: var(--paper);
		border: 1px solid var(--rule);
		padding: 2px 6px;
		transition:
			opacity 0.16s ease,
			transform 0.2s var(--ease-out);
	}

	.sheet-index li:hover .idx-label,
	.sheet-index a:focus-visible .idx-label {
		opacity: 1;
		transform: translate(0, -50%);
	}

	@media (max-width: 1199px) {
		.sheet-index {
			display: none;
		}
	}
</style>
