<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { getCommands, findCommand } from '../commands';
  import { tui } from '../state.svelte';
  import type { TuiCommand } from '../types';
  import TuiOverlay from './tui-overlay.svelte';
  import TuiTextInput from './tui-text-input.svelte';
  import TuiKey from './tui-key.svelte';

  const allCommands = $derived(getCommands());

  const results = $derived.by(() => {
    const needle = tui.paletteQuery.trim().toLowerCase();
    if (!needle) return allCommands;
    return allCommands.filter(
      (command) =>
        command.label.toLowerCase().includes(needle) ||
        command.description.toLowerCase().includes(needle),
    );
  });

  $effect(() => {
    tui.paletteQuery;
    tui.paletteIndex = 0;
  });

  function move(delta: number) {
    if (results.length === 0) return;
    tui.paletteIndex = (tui.paletteIndex + delta + results.length) % results.length;
  }

  function run(command: TuiCommand | undefined) {
    if (command) findCommand(command.id)?.run();
  }
</script>

<TuiOverlay title={m.tui_commands()} onclose={() => tui.closeOverlay()}>
  <div class="flex items-center gap-2 border-b border-[var(--tui-border)] px-3 py-2">
    <span class="tui-accent font-bold">:</span>
    <TuiTextInput
      bind:value={tui.paletteQuery}
      placeholder={m.tui_palette_placeholder()}
      ariaLabel={m.tui_commands()}
      onsubmit={() => run(results[tui.paletteIndex])}
      onescape={() => tui.closeOverlay()}
      onnavigate={move}
    />
  </div>

  <div class="tui-scroll max-h-[50vh] py-1">
    {#each results as command, index (command.id)}
      <button
        type="button"
        class={['tui-row', index === tui.paletteIndex && 'tui-row--active']}
        onclick={() => run(command)}
        onmouseenter={() => (tui.paletteIndex = index)}
      >
        <span class="tui-faint w-4 text-right">{index + 1}</span>
        <span class="tui-fg truncate">{command.label}</span>
        <span class="tui-dim ml-auto truncate text-[11px]">{command.description}</span>
        <TuiKey>{command.chord}</TuiKey>
      </button>
    {/each}

    {#if results.length === 0}
      <p class="tui-dim px-3 py-6 text-center">{m.tui_no_matches()}</p>
    {/if}
  </div>

  {#snippet footer()}
    <TuiKey>↑</TuiKey><TuiKey>↓</TuiKey>
    <TuiKey>enter</TuiKey>
    <span class="tui-faint">{m.tui_open()}</span>
  {/snippet}
</TuiOverlay>
