<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	let { compact = false }: { compact?: boolean } = $props();

	const current = $derived(getLocale());
	const labels: Record<string, string> = { en: m.lang_en(), it: m.lang_it() };
</script>

<div class="locale-switch" aria-label={m.lang_label()}>
	{#each locales as locale, index}
		<a
			href={localizeHref(page.url.pathname, { locale })}
			hreflang={locale}
			lang={locale}
			data-sveltekit-reload
			aria-current={current === locale ? 'true' : undefined}
			title={locale === 'it' ? m.lang_switch() : m.lang_switch_en()}
		>
			{compact ? locale : labels[locale]}
		</a>
		{#if index < locales.length - 1}<span aria-hidden="true">/</span>{/if}
	{/each}
</div>
