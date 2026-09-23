<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { tui } from '../state.svelte';
  import TuiKey from './tui-key.svelte';
</script>

<div
  class="flex flex-wrap items-center gap-2 border-b border-[var(--tui-border-soft)] bg-[var(--tui-panel-alt)] px-3 py-1.5 text-[11px]"
  role="status"
>
  <span class="tui-yellow" aria-hidden="true">✦</span>
  <span class="tui-dim">{m.tui_hint()}</span>
  <span class="ml-auto flex items-center gap-2">
    <TuiKey>space</TuiKey>
    <TuiKey>?</TuiKey>
    <button
      type="button"
      class="tui-link text-[11px]"
      onclick={() => tui.dismissHint()}
    >
      {m.tui_hint_dismiss()}
    </button>
  </span>
</div>
