<script>
  import { ExperienceTimeline } from "$lib/components/experience-timeline";
  import * as m from "$lib/paraglide/messages";
</script>

<section class="min-h-screen px-6 py-20" id="experience">
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-foreground">{m.experience_title()}</h2>
        <p class="text-muted-foreground mb-12">{m.experience_subtitle()}</p>
        <ExperienceTimeline />
    </div>
</section>
