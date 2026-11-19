<script lang="ts">
	import { onMount } from 'svelte';
	import { timeInMilan } from '$lib/format';

	let value = $state({ time: '—', iso: '', date: '' });

	onMount(() => {
		const tick = () => {
			value = timeInMilan();
		};
		tick();
		const timer = window.setInterval(tick, 1000);
		return () => window.clearInterval(timer);
	});
</script>

<time class="mono-sm" datetime={value.iso} title={value.date}>{value.time}</time>
