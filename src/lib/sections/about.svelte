<script>
  import { reveal } from "$lib/actions/reveal";
  import { Briefcase, Building2, GraduationCap, MapPin } from "@lucide/svelte";
  import * as m from "$lib/paraglide/messages";

  const highlights = $derived([
    { icon: Briefcase, label: m.about_highlight_role() },
    { icon: Building2, label: m.about_highlight_company() },
    { icon: MapPin, label: m.about_highlight_location() },
    { icon: GraduationCap, label: m.about_highlight_education() },
  ]);
</script>

<section class="px-6 py-20" id="about">
  <div class="max-w-4xl mx-auto">
    <h2 use:reveal class="text-3xl md:text-4xl font-bold mb-2 text-foreground">
      {m.about_title()}
    </h2>
    <p use:reveal={{ delay: 100 }} class="text-muted-foreground mb-12">
      {m.about_subtitle()}
    </p>

    <div class="grid md:grid-cols-2 gap-12 items-start">
      <!-- Bio -->
      <div class="space-y-4">
        <p use:reveal={{ delay: 150 }} class="text-foreground/80 leading-relaxed">
          {m.about_bio_1()}
        </p>
        <p use:reveal={{ delay: 200 }} class="text-foreground/80 leading-relaxed">
          {m.about_bio_2()}
        </p>
      </div>

      <!-- Highlights -->
      <div use:reveal={{ delay: 250 }} class="grid grid-cols-1 gap-3">
        {#each highlights as { icon: Icon, label }}
          <div
            class="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary border border-border"
          >
            <Icon class="w-4 h-4 text-primary shrink-0" />
            <span class="text-sm text-foreground/80">{label}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
