<script>
  import ProjectCard from "$lib/components/project-card.svelte";
  import { projects } from "$lib/conf";
</script>

<section id="projects" class="py-20 px-6 bg-secondary/30">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-2 text-foreground">
      Projects
    </h2>
    <p class="text-muted-foreground mb-12">
      A showcase of my personal projects
    </p>

    <div class="grid gap-6">
      {#each projects as project, index}
        <ProjectCard {project} />
      {/each}
    </div>
  </div>
</section>
