<script>
  import SkillCategory from "$lib/components/skill-category.svelte";
  import { getSkillCategories } from "$lib/conf";
  import * as m from "$lib/paraglide/messages";

  const skillCategories = $derived(getSkillCategories());
</script>

<section class="min-h-screen px-6 py-20" id="skills">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-2 text-foreground">{m.skills_title()}</h2>
    <p class="text-muted-foreground mb-12">
      {m.skills_subtitle()}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each skillCategories as category, index}
        <SkillCategory {category} {index} />
      {/each}
    </div>
  </div>
</section>
