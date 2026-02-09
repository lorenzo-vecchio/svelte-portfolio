<script lang="ts">
  import type { Skill } from "$lib/conf";

  interface Props {
    skill: Skill;
  }

  let { skill }: Props = $props();
</script>

<div
  class="flex flex-row md:flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all duration-200 min-w-25"
>
  <img src={skill.logo} alt={skill.name} loading="lazy" class="w-5 md:w-10 h-5 md:h-10 object-contain" />
  <span class="text-xs font-medium text-foreground text-center"
    >{skill.name}</span
  >
</div>
