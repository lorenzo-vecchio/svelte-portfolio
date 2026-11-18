<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toggleTheme } from '$lib/theme';
	import * as m from '$lib/paraglide/messages';
</script>

<button
	type="button"
	class="icon-btn theme-toggle"
	onclick={(event) => toggleTheme(event)}
	aria-label={m.theme_toggle()}
	title={m.theme_toggle()}
>
	<Sun class="theme-icon theme-icon-sun" size={16} strokeWidth={1.5} aria-hidden="true" />
	<Moon class="theme-icon theme-icon-moon" size={16} strokeWidth={1.5} aria-hidden="true" />
</button>

<style>
	.theme-toggle {
		position: relative;
	}

	:global(.theme-icon) {
		position: absolute;
		transition:
			opacity 0.2s ease,
			transform 0.3s var(--ease-out);
	}

	:global(.theme-icon-sun) {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}

	:global(.theme-icon-moon) {
		opacity: 0;
		transform: rotate(-45deg) scale(0.7);
	}

	:global(.dark) :global(.theme-icon-sun) {
		opacity: 0;
		transform: rotate(45deg) scale(0.7);
	}

	:global(.dark) :global(.theme-icon-moon) {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}
</style>
