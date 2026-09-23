<script lang="ts">
  import type { Snippet } from 'svelte';
  import TuiKey from './tui-key.svelte';

  type Props = {
    title: string;
    children: Snippet;
    onclose: () => void;
    footer?: Snippet;
    accent?: string;
    class?: string;
  };

  let { title, children, onclose, footer, accent = 'tui-accent', class: className = '' }: Props =
    $props();
</script>

<div
  class="fixed inset-0 z-40 flex items-start justify-center bg-black/60 p-3 pt-[8vh] backdrop-blur-[1px]"
  role="presentation"
  onclick={onclose}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={['tui-panel tui-panel--active w-full max-w-2xl shadow-2xl', className]}
    role="dialog"
    aria-modal="true"
    aria-label={title}
    tabindex="-1"
    onclick={(event) => event.stopPropagation()}
  >
    <header class="tui-panel-head">
      <span class={['font-bold', accent]}>{title}</span>
      <span class="ml-auto flex items-center gap-1">
        <span class="tui-faint">esc</span>
        <TuiKey onclick={onclose}>esc</TuiKey>
      </span>
    </header>

    {@render children()}

    {#if footer}
      <footer class="flex items-center gap-3 border-t border-[var(--tui-border)] px-3 py-2 text-[11px]">
        {@render footer()}
      </footer>
    {/if}
  </div>
</div>
