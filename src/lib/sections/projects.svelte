<script>
  import ProjectCard from "$lib/components/project-card.svelte";
  import ProjectGroupStack from "$lib/components/project-group-stack.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { getShowcaseProjectsEntries, getTotalProjectsCount, isGroup } from "$lib/conf";
  import { localizeHref } from "$lib/paraglide/runtime";
  import { ArrowRight } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import * as m from "$lib/paraglide/messages";

  const projectsEntries = $derived(getShowcaseProjectsEntries());
  const totalCount = $derived(getTotalProjectsCount());
</script>

<section id="projects" class="py-20 px-6 bg-secondary/30">
  <div class="max-w-4xl mx-auto">
    <h2 use:reveal class="text-3xl md:text-4xl font-bold mb-2 text-foreground">
      {m.projects_title()}
    </h2>
    <p use:reveal={{ delay: 100 }} class="text-muted-foreground mb-12">
      {m.projects_subtitle()}
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

    <div use:reveal={{ delay: 200 }} class="mt-10 flex justify-center">
      <Button href={localizeHref("/projects")} variant="outline" size="lg">
        {m.projects_view_all()}
        <span class="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-mono">
          {totalCount}
        </span>
        <ArrowRight class="w-4 h-4 ml-2" />
      </Button>
    </div>
  </div>
</section>
