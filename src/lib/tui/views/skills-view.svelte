<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { getSkillCategories } from '$lib/conf';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiPageHeader from '../components/tui-page-header.svelte';

  const categories = $derived(getSkillCategories());
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPageHeader title={m.skills_title()} subtitle={m.skills_subtitle()} file="skills.ts" />

  <div class="grid gap-3 sm:grid-cols-2">
    {#each categories as category (category.title)}
      <TuiPanel title={category.title}>
        <ul class="flex flex-wrap gap-1 p-3">
          {#each category.skills as skill (skill.name)}
            <li class="tui-fg border border-[var(--tui-border-soft)] bg-[var(--tui-panel-alt)] px-1.5 py-0.5 text-[11px]">
              {skill.name}
            </li>
          {/each}
        </ul>
      </TuiPanel>
    {/each}
  </div>
</div>
