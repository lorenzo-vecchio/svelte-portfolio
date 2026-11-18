<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	let visible = $state(false);
	let done = $state(false);

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let played = false;
		try {
			played = sessionStorage.getItem('lv-boot') === '1';
		} catch {
			played = false;
		}
		if (reduce || played) return;

		try {
			sessionStorage.setItem('lv-boot', '1');
		} catch {
			/* no-op */
		}

		visible = true;
		const closeAt = window.setTimeout(() => (done = true), 980);
		const hideAt = window.setTimeout(() => (visible = false), 1660);

		const onKey = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			done = true;
			window.setTimeout(() => (visible = false), 620);
		};
		window.addEventListener('keydown', onKey);

		return () => {
			window.clearTimeout(closeAt);
			window.clearTimeout(hideAt);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

{#if visible}
	<div class="boot" data-done={done} aria-hidden="true">
		<div class="boot-half boot-half-top"></div>
		<div class="boot-half boot-half-bottom"></div>
		<div class="boot-content">
			<div class="boot-state"><i></i>{m.boot_status()}</div>
			<div class="boot-mark">LGV / Sheet 01</div>
			<div class="boot-title">Lorenzo Vecchio</div>
			<div class="boot-line"></div>
			<div class="boot-coords">45.4642° N · 9.1900° E · Milano</div>
		</div>
	</div>
{/if}
