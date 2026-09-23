<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { getExperiences } from '$lib/conf';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiPageHeader from '../components/tui-page-header.svelte';

  const experiences = $derived(getExperiences());
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPageHeader
    title={m.experience_title()}
    subtitle={m.experience_subtitle()}
    file="experience.ts"
  />

  <ol class="space-y-3">
    {#each experiences as item (item.company + item.period)}
      <li>
        <TuiPanel>
          <div class="space-y-2 p-3 sm:p-4">
            <div class="flex flex-wrap items-baseline gap-x-2">
              <span class="tui-accent text-[13px] font-bold">{item.role}</span>
              <span class="tui-faint text-[11px]">@</span>
              <span class="tui-fg text-[12px]">{item.company}</span>
              <span class="tui-dim ml-auto text-[11px]">{item.period}</span>
            </div>
            <p class="tui-faint text-[11px]">{item.location}</p>
            <ul class="space-y-0.5">
              {#each item.description as line (line)}
                <li class="tui-dim flex gap-2 text-[11px]">
                  <span class="tui-green select-none">-</span>
                  <span>{line}</span>
                </li>
              {/each}
            </ul>
            {#if item.technologies?.length}
              <div class="flex flex-wrap gap-1 pt-1">
                {#each item.technologies as tech (tech)}
                  <span class="tui-faint border border-[var(--tui-border-soft)] px-1.5 py-0.5 text-[10px]">
                    {tech}
                  </span>
                {/each}
              </div>
            {/if}
          </div>
        </TuiPanel>
      </li>
    {/each}
  </ol>
</div>
