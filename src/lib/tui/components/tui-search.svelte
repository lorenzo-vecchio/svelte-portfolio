<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { findCommand } from '../commands';
  import { buildSearchIndex, searchAll } from '../search';
  import { tui } from '../state.svelte';
  import type { SearchResult } from '../types';
  import TuiOverlay from './tui-overlay.svelte';
  import TuiTextInput from './tui-text-input.svelte';
  import TuiKey from './tui-key.svelte';

  const catalog = $derived(buildSearchIndex());
  const results = $derived(searchAll(tui.searchQuery, catalog));

  const kindColor: Record<SearchResult['kind'], string> = {
    section: 'tui-accent',
    project: 'tui-green',
    skill: 'tui-cyan',
    experience: 'tui-yellow',
    command: 'tui-blue',
  };

  $effect(() => {
    tui.searchQuery;
    tui.searchIndex = 0;
  });

  function move(delta: number) {
    if (results.length === 0) return;
    tui.searchIndex = (tui.searchIndex + delta + results.length) % results.length;
  }

  function run(result: SearchResult | undefined) {
    if (result?.commandId) findCommand(result.commandId)?.run();
  }
</script>

<TuiOverlay title={m.tui_search()} onclose={() => tui.closeOverlay()}>
  <div class="flex items-center gap-2 border-b border-[var(--tui-border)] px-3 py-2">
    <span class="tui-cyan font-bold">/</span>
    <TuiTextInput
      bind:value={tui.searchQuery}
      placeholder={m.tui_search_placeholder()}
      ariaLabel={m.tui_search()}
      onsubmit={() => run(results[tui.searchIndex])}
      onescape={() => tui.closeOverlay()}
      onnavigate={move}
    />
  </div>

  <div class="tui-scroll max-h-[50vh] py-1">
    {#if results.length === 0 && !tui.searchQuery.trim()}
      <p class="tui-dim px-3 py-6 text-center">{m.tui_search_empty()}</p>
    {:else if results.length === 0}
      <p class="tui-dim px-3 py-6 text-center">{m.tui_no_matches()}</p>
    {:else}
      {#each results as result, index (result.id)}
        <button
          type="button"
          class={['tui-row', index === tui.searchIndex && 'tui-row--active']}
          onclick={() => run(result)}
          onmouseenter={() => (tui.searchIndex = index)}
        >
          <span class={['w-16 shrink-0 text-[10px] uppercase', kindColor[result.kind]]}>
            {result.kind}
          </span>
          <span class="tui-fg truncate">{result.title}</span>
          <span class="tui-dim ml-auto hidden truncate text-[11px] sm:inline">{result.subtitle}</span>
        </button>
      {/each}
    {/if}
  </div>

  {#snippet footer()}
    <span class="tui-faint">{m.tui_result_count({ count: results.length })}</span>
    <span class="ml-auto flex items-center gap-2">
      <TuiKey>↑</TuiKey><TuiKey>↓</TuiKey>
      <TuiKey>enter</TuiKey>
      <span class="tui-faint">{m.tui_open()}</span>
    </span>
  {/snippet}
</TuiOverlay>
