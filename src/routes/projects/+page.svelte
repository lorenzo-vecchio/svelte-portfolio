<script>
  import ProjectCard from "$lib/components/project-card.svelte";
  import ProjectGroupStack from "$lib/components/project-group-stack.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { getProjectsEntries, isGroup } from "$lib/conf";
  import { localizeHref } from "$lib/paraglide/runtime";
  import { ArrowLeft } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import * as m from "$lib/paraglide/messages";

  const projectsEntries = $derived(getProjectsEntries());
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
  <p use:reveal={{ delay: 100 }} class="text-muted-foreground mb-12">
    {m.projects_all_subtitle()}
  </p>

  <div class="grid gap-6">
    {#each projectsEntries as entry, index}
      {#if isGroup(entry)}
        <ProjectGroupStack group={entry} {index} />
      {:else}
        <div use:reveal={{ delay: index * 100 }}>
          <ProjectCard project={entry} />
        </div>
      {/if}
    {/each}
  </div>
</main>
