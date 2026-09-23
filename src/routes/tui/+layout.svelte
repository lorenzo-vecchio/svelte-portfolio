<script lang="ts">
  import '$lib/tui/tui.css';
  import * as m from '$lib/paraglide/messages';
  import TuiShell from '$lib/tui/components/tui-shell.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <title>{m.meta_title()} — TUI</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<TuiShell>
  {@render children()}
</TuiShell>
