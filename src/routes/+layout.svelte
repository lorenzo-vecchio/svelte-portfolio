<script lang="ts">
	import './layout.css';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { deLocalizeUrl, localizeHref, locales, getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import BootSequence from '$lib/components/boot-sequence.svelte';
	import ScrollProgress from '$lib/components/scroll-progress.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';
	import { gridShift } from '$lib/actions/grid-shift';

	let { children } = $props();

	type ViewTransitionDocument = Document & {
		startViewTransition?: (callback: () => void | Promise<void>) => {
			finished: Promise<void>;
		};
	};

	onNavigate((navigation) => {
		if (typeof document === 'undefined') return;
		const doc = document as ViewTransitionDocument;
		if (!doc.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (!navigation.to) return;
		if (navigation.to.url.pathname === navigation.from?.url.pathname) return;

		return new Promise<void>((resolve) => {
			doc.startViewTransition!(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const site = 'https://lorenzovecchio.dev';
	const locale = $derived(getLocale());
	const path = $derived(deLocalizeUrl(page.url).pathname);
	const canonical = $derived(site + localizeHref(path));
	const title = $derived(page.data.title ?? m.meta_title());
	const description = $derived(page.data.description ?? m.meta_description());
	const ogLocale = $derived(locale === 'it' ? 'it_IT' : 'en_US');
	const ogImage = $derived(`${site}/og-image.png`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Lorenzo Giovanni Vecchio" />
	<link rel="canonical" href={canonical} />
	{#each locales as alternate}
		<link
			rel="alternate"
			hreflang={alternate}
			href={site + localizeHref(path, { locale: alternate })}
		/>
	{/each}
	<link rel="alternate" hreflang="x-default" href={site + localizeHref(path, { locale: 'en' })} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="lorenzovecchio.dev" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={m.meta_og_alt()} />
	<meta property="og:locale" content={ogLocale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="sheet-grid" use:gridShift aria-hidden="true"></div>

<a class="skip-link" href="#main">{m.nav_skip()}</a>
<BootSequence />
<ScrollProgress />
<SiteHeader />
<main id="main" tabindex="-1">{@render children()}</main>
<SiteFooter />
