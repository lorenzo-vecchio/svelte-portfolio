<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let {
		code,
		title,
		intro
	}: {
		code: string;
		title: string;
		intro?: string;
	} = $props();
</script>

<header class="section-head" use:reveal>
	<div class="section-code" use:reveal>{code}</div>
	<h2 use:reveal={{ delay: 70 }}>{title}</h2>
	{#if intro}
		<p class="section-intro" use:reveal={{ delay: 140 }}>{intro}</p>
	{/if}
</header>
