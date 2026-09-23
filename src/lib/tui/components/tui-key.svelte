<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    onclick?: () => void;
    wide?: boolean;
    title?: string;
  };

  let { children, onclick, wide = false, title }: Props = $props();
</script>

{#if onclick}
  <button
    type="button"
    class={['tui-key', wide && 'tui-key--wide']}
    {title}
    {onclick}
  >
    {@render children()}
  </button>
{:else}
  <span class={['tui-key', wide && 'tui-key--wide']} {title}>
    {@render children()}
  </span>
{/if}
