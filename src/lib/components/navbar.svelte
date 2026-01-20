<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { navItems } from "$lib/conf";
  import { onMount } from "svelte";
  import AuroraText from "./aurora-text.svelte";

  let isScrolled = $state(false);
  let isMobileMenuOpen = $state(false);

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<nav
  class={[
    "fixed top-0 left-0 right-0 transition-all duration-300",
    isScrolled ?? "bg-background/80 backdrop-blur-lg border-b border-border",
  ]}
>
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <Button href="/" variant="ghost" class="text-xl font-bold text-primary">
        <AuroraText className="font-bold">LGV</AuroraText>
    </Button>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-1">
      {#each navItems as item}
        <Button href={item.href} variant="ghost">
          {item.label}
        </Button>
      {/each}
    </div>
  </div>
</nav>
