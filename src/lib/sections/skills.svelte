<script>
  import SkillCard from "$lib/components/skill-card.svelte";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { skillCategories } from "$lib/conf";
</script>

<section class="min-h-screen px-6 py-20" id="skills">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-2 text-foreground">Skills</h2>
    <p class="text-muted-foreground mb-12">
      Technologies and tools I work with
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each skillCategories as category, index}
        <Card
          class="card-shadow hover:border-primary/50 transition-colors animate-fade-in"
          style="animation-delay: {index * 0.1}s"
        >
          <CardHeader class="pb-4">
            <CardTitle class="flex items-center gap-3 text-lg">
              <span class="p-2 rounded-lg bg-primary/10 text-primary">
                <svelte:component this={category.icon} class="w-5 h-5" />
              </span>
              {category.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-3">
              {#each category.skills as skill}
                <SkillCard {skill} />
              {/each}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>
</section>
