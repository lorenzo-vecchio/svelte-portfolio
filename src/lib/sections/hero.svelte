<script>
  import AuroraText from "$lib/components/aurora-text.svelte";
  import { Button } from "$lib/components/ui/button";
  import { ChevronDown, Github, Linkedin, Mail, MapPin } from "@lucide/svelte";
</script>

<section class="min-h-screen flex flex-col justify-center relative px-6 py-20">
  <div class="max-w-4xl mx-auto w-full z-20">
    <!-- Status badge -->
    <div
      class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in"
    >
      <span class="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
      <span class="text-sm text-muted-foreground">Open to opportunities</span>
    </div>

    <!-- Main heading -->
    <h1
      class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in text-foreground"
      style="animation-delay: 0.1s"
    >
      <span class="text-foreground/80">Hi, I'm</span>{" "}
      <AuroraText>Lorenzo Giovanni Vecchio</AuroraText>
    </h1>

    <!-- Subtitle -->
    <p
      class="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 animate-fade-in"
      style="animation-delay: 0.2s"
    >
      Software Developer passionate about building robust full-stack
      applications and architecting scalable solutions.
    </p>

    <!-- Info row -->
    <div
      class="flex flex-wrap gap-4 mb-10 animate-fade-in"
      style="animation-delay: 0.3s"
    >
      <div class="flex items-center gap-2 text-muted-foreground">
        <MapPin class="w-4 h-4 text-primary" />
        <span>Milan, Italy</span>
      </div>
      <div class="flex items-center gap-2 text-muted-foreground">
        <span
          class="px-2 py-1 text-xs rounded bg-secondary border border-border font-mono"
        >
          PwC Italy
        </span>
      </div>
    </div>

    <!-- CTA Buttons -->
    <div
      class="flex flex-wrap gap-4 animate-fade-in"
      style="animation-delay: 0.4s"
    >
      <Button size="lg">
        <a href="#contact" class="flex flex-row">
          <Mail class="w-4 h-4 mr-2" />
          Get in touch
        </a>
      </Button>
      <Button variant="outline" size="lg">
        <a
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row"
        >
          <Linkedin class="w-4 h-4 mr-2" />
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" size="lg">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row"
        >
          <Github class="w-4 h-4 mr-2" />
          GitHub
        </a>
      </Button>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronDown class="w-6 h-6 text-muted-foreground" />
  </div>

  <!-- Background decoration -->
  <div
    class="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
  />
  <div
    class="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"
  />
</section>

<style>
  @keyframes pulse-glow {
    0%,
    100% {
      filter: brightness(100%) saturate(100%);
      text-shadow: 0 0 0px hsl(var(--primary) / 0);
    }
    50% {
      filter: brightness(150%) saturate(150%);
      /* A subtle text-shadow helps "bleed" the light outside the letters */
      text-shadow: 0 0 8px hsl(var(--primary) / 0.5);
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
</style>
