<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { getProjectsEntries, isGroup, getTotalProjectsCount } from '$lib/conf';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiPageHeader from '../components/tui-page-header.svelte';
  import TuiProjectLinks from '../components/tui-project-links.svelte';
  import TuiStatusBadge from '../components/tui-status-badge.svelte';

  const entries = $derived(getProjectsEntries());
  const total = $derived(getTotalProjectsCount());
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPageHeader title={m.projects_title()} subtitle={m.projects_all_subtitle()} file="projects.ts" />

  <p class="tui-faint text-[11px]">
    // {m.project_group_count({ count: total })}
  </p>

  {#each entries as entry (isGroup(entry) ? entry.groupTitle : entry.title)}
    {#if isGroup(entry)}
      <TuiPanel title={`${entry.groupTitle}/`}>
        <div class="space-y-3 p-3">
          <p class="tui-dim text-[12px]">{entry.groupDescription}</p>
          <div class="flex flex-wrap gap-1">
            {#each entry.groupTechnologies ?? [] as tech (tech)}
              <span class="tui-faint border border-[var(--tui-border-soft)] px-1.5 py-0.5 text-[10px]">
                {tech}
              </span>
            {/each}
          </div>
          <div class="space-y-2 border-l border-[var(--tui-border-soft)] pl-3">
            {#each entry.projects as project (project.title)}
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="tui-fg font-bold text-[12px]">{project.title}</span>
                  <TuiStatusBadge status={project.status} />
                </div>
                <p class="tui-dim text-[11px] leading-relaxed">{project.description}</p>
                <TuiProjectLinks {project} />
              </div>
            {/each}
          </div>
        </div>
      </TuiPanel>
    {:else}
      <TuiPanel>
        {#snippet actions()}
          <TuiStatusBadge status={entry.status} />
        {/snippet}
        <div class="space-y-2 p-3">
          <h2 class="tui-accent font-bold text-[13px]">{entry.title}</h2>
          <p class="tui-dim text-[11px] leading-relaxed">{entry.description}</p>
          <div class="flex flex-wrap gap-1">
            {#each entry.technologies as tech (tech)}
              <span class="tui-faint border border-[var(--tui-border-soft)] px-1.5 py-0.5 text-[10px]">
                {tech}
              </span>
            {/each}
          </div>
          <TuiProjectLinks project={entry} />
        </div>
      </TuiPanel>
    {/if}
  {/each}
</div>
