<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import * as m from '$lib/paraglide/messages';
  import { getSections, sectionHref } from '../sections';
  import { tui } from '../state.svelte';

  const sections = $derived(getSections());

  function open(index: number) {
    tui.explorerIndex = index;
    tui.closeSidebar();
    void goto(sectionHref(sections[index]));
  }
</script>

<aside class="flex h-full flex-col bg-[var(--tui-bg-alt)]" aria-label={m.tui_explorer()}>
  <header class="tui-panel-head justify-between">
    <span>{m.tui_explorer()}</span>
    <button
      type="button"
      class="tui-dim md:hidden"
      aria-label={m.tui_close()}
      onclick={() => tui.closeSidebar()}
    >
      ✕
    </button>
  </header>

  <div class="tui-scroll flex-1 py-1">
    <p class="tui-row tui-row--muted cursor-default">
      <span class="tui-faint">▾</span>
      <span>{m.tui_root()}/</span>
    </p>

    {#each sections as section, index (section.id)}
      <button
        type="button"
        class={[
          'tui-row pl-6',
          index === tui.explorerIndex && 'tui-row--active',
          page.route.id === section.path && 'font-bold',
        ]}
        aria-current={page.route.id === section.path ? 'page' : undefined}
        onclick={() => open(index)}
        onmouseenter={() => (tui.explorerIndex = index)}
      >
        <span
          class={page.route.id === section.path ? 'tui-accent' : 'tui-faint'}
          aria-hidden="true"
        >
          {page.route.id === section.path ? '▸' : '·'}
        </span>
        <span class="truncate">{section.filename}</span>
      </button>
    {/each}
  </div>

  <footer class="border-t border-[var(--tui-border-soft)] px-3 py-1.5 text-[10px] tui-faint">
    j/k · enter
  </footer>
</aside>
