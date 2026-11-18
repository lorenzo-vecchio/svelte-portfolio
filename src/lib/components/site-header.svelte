<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import LocaleSwitch from './locale-switch.svelte';
	import MobileMenu from './mobile-menu.svelte';
	import ThemeToggle from './theme-toggle.svelte';

	let scrolled = $state(false);

	onMount(() => {
		const update = () => (scrolled = window.scrollY > 10);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

	const home = $derived(localizeHref('/'));
	const path = $derived<string>(page.url.pathname);
	const isHome = $derived(path === '/' || path === '/it' || path === '/it/');
	const isProjects = $derived(path.includes('/projects'));

	const links = $derived([
		{ href: isHome ? '#work' : `${home}#work`, label: m.nav_work() },
		{ href: isHome ? '#about' : `${home}#about`, label: m.nav_about() },
		{ href: isHome ? '#toolkit' : `${home}#toolkit`, label: m.nav_toolkit() },
		{ href: localizeHref('/projects'), label: m.nav_projects(), active: isProjects },
		{ href: isHome ? '#contact' : `${home}#contact`, label: m.nav_contact() }
	]);
</script>

<header class="site-header" data-scrolled={scrolled}>
	<div class="shell header-inner">
		<a class="brand" href={home} aria-label="Lorenzo Vecchio">
			<span class="brand-mark" aria-hidden="true">LV</span>
			<span class="brand-name">
				<strong>Lorenzo Vecchio</strong>
				<span>{m.brand_subtitle()}</span>
			</span>
		</a>

		<nav class="header-nav" aria-label={m.nav_menu()}>
			{#each links as link}
				<a href={link.href} aria-current={link.active ? 'true' : undefined}>{link.label}</a>
			{/each}
		</nav>

		<div class="header-tools">
			<div class="header-locale"><LocaleSwitch /></div>
			<ThemeToggle />
			<MobileMenu {links} />
		</div>
	</div>
</header>

<style>
	.header-locale {
		display: none;
		align-items: center;
	}

	@media (min-width: 900px) {
		.header-locale {
			display: flex;
		}
	}
</style>
