<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { findCommand } from '../commands';
  import { tui } from '../state.svelte';
  import TuiKey from './tui-key.svelte';
  import type { TuiSection } from '../types';

  type Props = {
    section?: TuiSection;
  };

  let { section }: Props = $props();

  const mode = $derived.by(() => {
    switch (tui.overlay) {
      case 'whichkey':
        return { label: m.tui_leader(), color: 'bg-[var(--tui-yellow)] text-black' };
      case 'palette':
        return { label: m.tui_commands(), color: 'bg-[var(--tui-accent)] text-black' };
      case 'search':
        return { label: m.tui_search(), color: 'bg-[var(--tui-cyan)] text-black' };
      case 'help':
        return { label: m.tui_help(), color: 'bg-[var(--tui-blue)] text-black' };
      default:
        return { label: m.tui_mode_normal(), color: 'bg-[var(--tui-accent)] text-black' };
    }
  });

  function run(commandId: string) {
    findCommand(commandId)?.run();
  }
</script>

<footer
  class="flex items-center gap-3 border-t border-[var(--tui-border)] bg-[var(--tui-bg-alt)] px-3 py-1.5 text-[11px]"
>
  <span class={['px-2 py-0.5 font-bold tracking-wide', mode.color]}>{mode.label}</span>

  {#if tui.statusMessage}
    <span class="tui-green truncate">{tui.statusMessage}</span>
  {:else}
    <span class="tui-dim hidden truncate sm:inline">{section?.filename ?? ''}</span>
  {/if}

  <div class="ml-auto flex items-center gap-2">
    <span class="tui-faint hidden items-center gap-1 lg:flex">
      <span>filetype:</span><span class="tui-dim">{section?.filetype ?? ''}</span>
      <span class="mx-1">·</span>
      <span>encoding:</span><span class="tui-dim">{m.tui_encoding()}</span>
    </span>

    <span class="flex items-center gap-1">
      <TuiKey title={m.tui_menu()} onclick={() => run('ui.menu')}>space</TuiKey>
      <span class="tui-faint hidden sm:inline">{m.tui_menu()}</span>
    </span>
    <span class="flex items-center gap-1">
      <TuiKey title={m.tui_search()} onclick={() => run('ui.search')}>/</TuiKey>
      <span class="tui-faint hidden sm:inline">{m.tui_search()}</span>
    </span>
    <span class="flex items-center gap-1">
      <TuiKey title={m.tui_help()} onclick={() => run('ui.help')}>?</TuiKey>
      <span class="tui-faint hidden sm:inline">{m.tui_help()}</span>
    </span>
  </div>
</footer>
