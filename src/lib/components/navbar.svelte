<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { navItems } from "$lib/conf";
  import Footer from "$lib/sections/footer.svelte";
  import { Menu, X } from "@lucide/svelte";
  import { onMount } from "svelte";
  import ThemeButton from "./theme-button.svelte";

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
    "z-50 fixed top-0 left-0 right-0 transition-all duration-300",
    isMobileMenuOpen
      ? "bg-background"
      : isScrolled
        ? "bg-background/70 backdrop-blur-md border-b border-border"
        : "",
  ]}
>
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <Button href="/" variant="ghost" class="text-xl font-bold text-primary">
      <span class="font-black">LGV</span>
    </Button>

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-1">
      {#each navItems as item}
        <Button href={item.href} variant="ghost">
          {item.label}
        </Button>
      {/each}
      <ThemeButton />
    </div>

    <!-- Mobile Menu Button -->
  <button
    class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-muted"
    onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
  >
    {#if isMobileMenuOpen}
      <X class="w-5 h-5" />
    {:else}
      <Menu class="w-5 h-5" />
    {/if}
  </button>
  </div>

  

  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <div class="md:hidden bg-background border-b border-border h-screen .fullscreen-h w-screen flex flex-col justify-between items-center">
      <div></div>
      <div class="space-y-2 flex flex-col justify-center items-center">
        {#each navItems as item}
          <a
            href={item.href}
            onclick={() => (isMobileMenuOpen = false)}
            class="block py-2 text-2xl"
          >
            {item.label}
          </a>
        {/each}
      </div>
      <ThemeButton />
      <div class="mb-14">
        <Footer />
      </div>
    </div>
  {/if}
</nav>

<style>
  .fullscreen-h {
    min-height: 100vh; 
    min-height: -webkit-fill-available;
  }
</style>