<script lang="ts">
  import type { SkillCategory } from "$lib/conf";
  import SkillCard from "./skill-card.svelte";
  import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

  interface Props {
    category: SkillCategory;
    index: number;
  }

  let { category, index }: Props = $props();
</script>

<Card
  class="card-shadow hover:border-primary/50 transition-colors animate-fade-in"
  style="animation-delay: {index * 0.1}s"
>
  <CardHeader class="pb-4">
    <CardTitle class="flex items-center gap-3 text-lg">
      <span class="p-2 rounded-lg bg-primary/10 text-primary">
        <category.icon class="w-5 h-5" />
      </span>
      {category.title}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div class="flex flex-wrap gap-3 justify-center items-center content-center">
      {#each category.skills as skill}
        <SkillCard {skill} />
      {/each}
    </div>
  </CardContent>
</Card>
