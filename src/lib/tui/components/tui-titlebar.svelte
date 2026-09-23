<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import LanguageSwitcher from '$lib/components/language-switcher.svelte';
  import type { TuiSection } from '../types';
  import TuiCursor from './tui-cursor.svelte';

  type Props = {
    section?: TuiSection;
  };

  let { section }: Props = $props();
</script>

<header
  class="flex items-center gap-3 border-b border-[var(--tui-border)] bg-[var(--tui-bg-alt)] px-3 py-1.5"
>
  <span class="flex items-center gap-1.5" aria-hidden="true">
    <span class="h-2.5 w-2.5 rounded-full bg-[var(--tui-red)]"></span>
    <span class="h-2.5 w-2.5 rounded-full bg-[var(--tui-yellow)]"></span>
    <span class="h-2.5 w-2.5 rounded-full bg-[var(--tui-green)]"></span>
  </span>

  <span class="tui-dim hidden items-center gap-1 sm:flex">
    <span class="tui-accent">lgv</span><span class="tui-faint">@</span><span>portfolio</span>
  </span>

  <span class="tui-dim flex min-w-0 items-center gap-1 truncate">
    <span class="tui-faint">~/tui/</span>
    <span class="tui-fg truncate">{section?.filename ?? ''}</span>
    <TuiCursor variant="green" />
  </span>

  <div class="ml-auto flex items-center gap-3">
    <a
      href={localizeHref('/')}
      class="tui-dim hidden text-[11px] hover:text-[var(--tui-cyan)] sm:inline"
      title={m.tui_open_main_site()}
    >
      {m.tui_open_main_site()} ↗
    </a>
    <LanguageSwitcher />
  </div>
</header>
