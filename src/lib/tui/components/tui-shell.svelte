<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';
  import { handleGlobalKeydown } from '../keyboard';
  import { getSections, findSectionByRouteId } from '../sections';
  import { tui } from '../state.svelte';
  import TuiTitlebar from './tui-titlebar.svelte';
  import TuiTabs from './tui-tabs.svelte';
  import TuiExplorer from './tui-explorer.svelte';
  import TuiStatusline from './tui-statusline.svelte';
  import TuiHint from './tui-hint.svelte';
  import TuiWhichKey from './tui-which-key.svelte';
  import TuiCommandPalette from './tui-command-palette.svelte';
  import TuiSearch from './tui-search.svelte';
  import TuiHelp from './tui-help.svelte';

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();

  const section = $derived(findSectionByRouteId(page.route.id));

  $effect(() => {
    const routeId = page.route.id;
    const index = getSections().findIndex((entry) => entry.path === routeId);
    if (index >= 0) tui.explorerIndex = index;
    tui.closeSidebar();
  });
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<div class="tui-root h-[100dvh] overflow-hidden">
  <a
    href="#tui-content"
    class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-[var(--tui-accent)] focus:px-3 focus:py-1 focus:text-black"
  >
    {m.tui_skip()}
  </a>

  <TuiTitlebar {section} />
  <TuiTabs />
  {#if !tui.hintDismissed}
    <TuiHint />
  {/if}

  <div class="flex min-h-0 flex-1">
    <div class="hidden w-56 shrink-0 border-r border-[var(--tui-border)] md:block">
      <TuiExplorer />
    </div>

    <main id="tui-content" class="tui-scroll min-w-0 flex-1 p-3 sm:p-5">
      {@render children()}
    </main>
  </div>

  <TuiStatusline {section} />

  {#if tui.sidebarOpen}
    <div class="fixed inset-0 z-30 md:hidden" role="presentation">
      <div
        class="absolute inset-0 bg-black/60"
        role="presentation"
        onclick={() => tui.closeSidebar()}
      ></div>
      <div class="absolute inset-y-0 left-0 w-64 border-r border-[var(--tui-border)]">
        <TuiExplorer />
      </div>
    </div>
  {/if}

  {#if tui.overlay === 'whichkey'}
    <TuiWhichKey />
  {:else if tui.overlay === 'palette'}
    <TuiCommandPalette />
  {:else if tui.overlay === 'search'}
    <TuiSearch />
  {:else if tui.overlay === 'help'}
    <TuiHelp />
  {/if}
</div>
