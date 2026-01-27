<script lang="ts">
  import type { ExperienceItem } from "$lib/conf";
  import { Badge } from "$lib/components/ui/badge";
  import { Card, CardContent } from "$lib/components/ui/card";
  import { BriefcaseBusiness, CircleSmall, GraduationCap } from "@lucide/svelte";

  interface Props {
    exp: ExperienceItem;
    index: number;
  }

  let { exp, index }: Props = $props();
</script>

<div
  class="relative pl-8 md:pl-20 animate-fade-in"
  style="animation-delay: {index * 0.1}s"
>
  <!-- Timeline dot -->
  <div class="absolute left-0 md:left-8 top-6 w-7 h-7 -translate-x-1/2 rounded-full bg-primary glow flex justify-center items-center">
    {#if exp.type === "education"}
        <GraduationCap class="text-white" strokeWidth={1.5} />
      {:else if exp.type === "work"}
        <BriefcaseBusiness class="text-white m-1" strokeWidth={1.5} />
    {/if}
  </div>

  <Card class="card-shadow hover:border-primary/50 transition-colors">
    <CardContent class="p-6">
      <div
        class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4"
      >
        <div>
          <h3 class="text-xl font-semibold">{exp.role}</h3>
          <p class="text-primary font-medium">{exp.company}</p>
        </div>
        <div class="text-sm text-muted-foreground text-right">
          <p>{exp.period}</p>
          <p>{exp.location}</p>
        </div>
      </div>

      <ul class="space-y-2 mb-4">
        {#each exp.description as desc, i}
          <li class="text-muted-foreground flex items-center gap-2">
            <CircleSmall class="text-primary flex flex-col justify-center items-center min-w-[16px] min-h-[16px]" size={16} />
            <span>{desc}</span>
          </li>
        {/each}
      </ul>

      {#if exp.technologies}
        <div class="flex flex-wrap gap-2">
          {#each exp.technologies as tech}
            <Badge variant="secondary" class="font-mono text-xs">
              {tech}
            </Badge>
          {/each}
        </div>
      {/if}
    </CardContent>
  </Card>
</div>
