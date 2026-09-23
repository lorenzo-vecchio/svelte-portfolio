<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    children: Snippet;
    title?: string;
    actions?: Snippet;
    class?: string;
    bodyClass?: string;
  };

  let { children, title, actions, class: className = '', bodyClass = '' }: Props = $props();
</script>

<section class={['tui-panel', className]}>
  {#if title || actions}
    <header class="tui-panel-head">
      {#if title}<span class="truncate">{title}</span>{/if}
      {#if actions}
        <span class="ml-auto flex items-center gap-1">{@render actions()}</span>
      {/if}
    </header>
  {/if}
  <div class={bodyClass}>
    {@render children()}
  </div>
</section>
