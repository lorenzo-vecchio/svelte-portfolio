<script lang="ts">
  import { page } from '$app/state';
  import * as m from '$lib/paraglide/messages';
  import { localizeHref } from '$lib/paraglide/runtime';
  import TuiPanel from '$lib/tui/components/tui-panel.svelte';
</script>

<div class="mx-auto max-w-xl pt-6 sm:pt-12">
  <TuiPanel title="error">
    <div class="space-y-3 p-4">
      <p class="tui-red text-[13px] font-bold">ERR {page.status}</p>
      <p class="tui-dim text-[12px] leading-relaxed">
        {page.status === 404 ? m.error_404_message() : m.error_generic_message()}
      </p>
      <a class="tui-link text-[12px]" href={localizeHref('/tui')}>{m.error_go_home()}</a>
    </div>
  </TuiPanel>
</div>
