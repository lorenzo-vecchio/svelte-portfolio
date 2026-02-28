<script>
  import ProjectCard from "$lib/components/project-card.svelte";
  import ProjectGroupStack from "$lib/components/project-group-stack.svelte";
  import { getProjectsEntries, isGroup } from "$lib/conf";
  import * as m from "$lib/paraglide/messages";

  const projectsEntries = $derived(getProjectsEntries());
</script>

<section id="projects" class="py-20 px-6 bg-secondary/30">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-2 text-foreground">
      {m.projects_title()}
    </h2>
    <p class="text-muted-foreground mb-12">
      {m.projects_subtitle()}
    </p>

    <div class="grid gap-6">
      {#each projectsEntries as entry, index}
        {#if isGroup(entry)}
          <ProjectGroupStack group={entry} {index} />
          {:else}
          <ProjectCard project={entry} />
        {/if}
      {/each}
    </div>
  </div>
</section>
