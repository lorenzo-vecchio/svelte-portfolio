<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { getSections, sectionHref } from '../sections';
  import TuiKey from './tui-key.svelte';

  const sections = $derived(getSections());

  function isActive(path: string): boolean {
    return page.route.id === path;
  }

  function open(path: string) {
    const section = sections.find((entry) => entry.path === path);
    if (section) void goto(sectionHref(section));
  }
</script>

<nav
  aria-label="Open sections"
  class="tui-scroll flex items-stretch gap-px border-b border-[var(--tui-border)] bg-[var(--tui-bg-alt)]"
>
  {#each sections as section (section.id)}
    <button
      type="button"
      onclick={() => open(section.path)}
      aria-current={isActive(section.path) ? 'page' : undefined}
      class={[
        'flex shrink-0 items-center gap-2 border-r border-[var(--tui-border-soft)] px-3 py-1.5 text-[12px] transition-colors',
        isActive(section.path)
          ? 'bg-[var(--tui-panel)] text-[var(--tui-accent)]'
          : 'tui-dim hover:bg-[var(--tui-panel-alt)] hover:text-[var(--tui-fg)]',
      ]}
    >
      <TuiKey>{section.tabKey}</TuiKey>
      <span>{section.label}</span>
      {#if isActive(section.path)}
        <span class="h-1.5 w-1.5 rounded-full bg-[var(--tui-accent)]"></span>
      {/if}
    </button>
  {/each}
</nav>
