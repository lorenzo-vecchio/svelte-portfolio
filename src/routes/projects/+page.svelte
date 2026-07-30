<script lang="ts">
  import ProjectCard from "$lib/components/project-card.svelte";
  import ProjectGroupStack from "$lib/components/project-group-stack.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { getProjectsEntries, isGroup } from "$lib/conf";
  import { localizeHref } from "$lib/paraglide/runtime";
  import { ArrowLeft } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import * as m from "$lib/paraglide/messages";

  const projectsEntries = $derived(getProjectsEntries());

  const allTechnologies = $derived(
    [...new Set(
      projectsEntries.flatMap((entry) =>
        isGroup(entry)
          ? [...(entry.groupTechnologies ?? []), ...entry.projects.flatMap((p) => p.technologies)]
          : entry.technologies
      )
    )].sort()
  );

  let selected = $state<Set<string>>(new Set());

  function toggle(tag: string) {
    if (selected.has(tag)) {
      selected.delete(tag);
    } else {
      selected.add(tag);
    }
    selected = new Set(selected); // trigger reactivity
  }

  const filteredEntries = $derived(
    selected.size === 0
      ? projectsEntries
      : projectsEntries.filter((entry) => {
          if (isGroup(entry)) {
            const allTags = [...(entry.groupTechnologies ?? []), ...entry.projects.flatMap((p) => p.technologies)];
            return [...selected].every((t) => allTags.includes(t));
          }
          return [...selected].every((t) => entry.technologies.includes(t));
        })
  );
</script>

<main class="min-h-screen mt-20 px-6 py-20 max-w-4xl mx-auto">
  <div class="mb-6">
    <Button href={localizeHref("/")} variant="ghost" size="sm" class="-ml-2">
      <ArrowLeft class="w-4 h-4 mr-1" />
      Home
    </Button>
  </div>

  <h1 use:reveal class="text-3xl md:text-4xl font-bold mb-2 text-foreground">
    {m.projects_title()}
  </h1>
  <p use:reveal={{ delay: 100 }} class="text-muted-foreground mb-6">
    {m.projects_all_subtitle()}
  </p>

  <p use:reveal={{ delay: 150 }} class="text-xs text-muted-foreground mb-3">
    {m.projects_filter_hint()}
  </p>

  <div use:reveal={{ delay: 200 }} class="flex flex-wrap gap-2 mb-10">
    {#each allTechnologies as tag}
      <button onclick={() => toggle(tag)} class="cursor-pointer" aria-pressed={selected.has(tag)}>
        <Badge variant={selected.has(tag) ? 'default' : 'outline'}>
          {tag}
        </Badge>
      </button>
    {/each}
  </div>

  <div class="grid gap-6">
    {#each filteredEntries as entry, index}
      {#if isGroup(entry)}
        <ProjectGroupStack group={entry} {index} />
      {:else}
        <div use:reveal={{ delay: index * 50 }}>
          <ProjectCard project={entry} />
        </div>
      {/if}
    {/each}
  </div>

  {#if filteredEntries.length === 0}
    <p class="text-muted-foreground text-center py-12">
      No projects match the selected filters.
    </p>
  {/if}
</main>
