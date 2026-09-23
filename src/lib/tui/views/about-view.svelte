<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiPageHeader from '../components/tui-page-header.svelte';

  const highlights = [
    { key: 'role', value: m.about_highlight_role() },
    { key: 'company', value: m.about_highlight_company() },
    { key: 'location', value: m.about_highlight_location() },
    { key: 'education', value: m.about_highlight_education() },
  ];
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPageHeader title={m.about_title()} subtitle={m.about_subtitle()} file="about.ts" />

  <TuiPanel title="bio">
    <div class="space-y-3 p-3 text-[12px] leading-relaxed sm:p-4">
      <p class="tui-fg">{m.about_bio_1()}</p>
      <p class="tui-fg">{m.about_bio_2()}</p>
    </div>
  </TuiPanel>

  <TuiPanel title="highlights">
    <dl class="grid gap-0 p-1 sm:grid-cols-2">
      {#each highlights as highlight (highlight.key)}
        <div class="tui-row cursor-default">
          <dt class="tui-faint w-24 shrink-0">{highlight.key}</dt>
          <dd class="tui-fg">{highlight.value}</dd>
        </div>
      {/each}
    </dl>
  </TuiPanel>
</div>
