<script lang="ts">
	import { onMount } from 'svelte';
	import { X } from '@lucide/svelte';
	import LocaleSwitch from './locale-switch.svelte';
	import ThemeToggle from './theme-toggle.svelte';
	import * as m from '$lib/paraglide/messages';

	interface NavLink {
		href: string;
		label: string;
	}

	let { links }: { links: NavLink[] } = $props();

	let dialog = $state<HTMLDialogElement>();
	let open = $state(false);

	function show() {
		open = true;
		dialog?.showModal();
	}

	function close() {
		open = false;
		dialog?.close();
	}

	onMount(() => {
		const node = dialog;
		if (!node) return;
		const onClose = () => (open = false);
		const onCancel = (event: Event) => {
			event.preventDefault();
			close();
		};
		node.addEventListener('close', onClose);
		node.addEventListener('cancel', onCancel);
		return () => {
			node.removeEventListener('close', onClose);
			node.removeEventListener('cancel', onCancel);
		};
	});
</script>

<button
	type="button"
	class="mobile-menu-btn"
	aria-haspopup="dialog"
	aria-expanded={open}
	onclick={show}
>
	{m.nav_menu()}
	<span class="menu-bars" aria-hidden="true"><i></i><i></i></span>
</button>

<dialog bind:this={dialog} class="sheet-dialog" aria-label={m.nav_menu()}>
	<div class="sheet-dialog-panel">
		<div class="sheet-dialog-top">
			<span class="mono">LGV / INDEX</span>
			<button type="button" class="icon-btn" onclick={close} aria-label={m.nav_close()}>
				<X size={16} strokeWidth={1.5} aria-hidden="true" />
			</button>
		</div>

		<nav class="sheet-dialog-links" aria-label={m.nav_menu()}>
			{#each links as link, index}
				<a href={link.href} onclick={close}>
					{link.label}
					<span>{String(index + 1).padStart(2, '0')}</span>
				</a>
			{/each}
		</nav>

		<div class="sheet-dialog-bottom">
			<LocaleSwitch />
			<ThemeToggle />
			<span class="mono">45.4642° N / 9.1900° E</span>
		</div>
	</div>
</dialog>

<style>
	.menu-bars {
		display: inline-flex;
		flex-direction: column;
		gap: 3px;
		width: 12px;
	}

	.menu-bars i {
		display: block;
		height: 1px;
		background: currentColor;
	}
</style>
