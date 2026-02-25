<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { getNavItems } from "$lib/conf";
  import { Menu, X } from "@lucide/svelte";
  import { onMount } from "svelte";
  import ThemeButton from "./theme-button.svelte";
  import { locales, localizeHref, getLocale } from "$lib/paraglide/runtime";
  import { page } from "$app/state";

  let isScrolled = $state(false);
  let isMobileMenuOpen = $state(false);
  let outerHeight = $state(0);

  const navItems = $derived(getNavItems());

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };

    handleScroll(); // Initial check

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:window bind:outerHeight={outerHeight} />

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
      <!-- Language switcher -->
      <div class="flex items-center gap-1 ml-1 border-l border-border pl-2">
        {#each locales as locale}
          <a
            href={localizeHref(page.url.pathname, { locale })}
            data-sveltekit-reload
            class={[
              "px-2 py-1 text-xs font-semibold rounded uppercase transition-colors",
              getLocale() === locale
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            ]}
          >
            {locale}
          </a>
        {/each}
      </div>
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
    <div class="fixed top-10 left-0 md:hidden bg-background border-b border-border pb-[env(safe-area-inset-bottom)] w-screen flex flex-col justify-start items-center"
      style="min-height: {outerHeight}px">
      <div></div>
      <div class="space-y-2 flex flex-col justify-center items-center mt-14 mb-10">
        {#each navItems as item}
          <a
            href={item.href}
            onclick={() => (isMobileMenuOpen = false)}
            class="block py-2 text-2xl"
          >
            {item.label}
          </a>
        {/each}
        <!-- Mobile language switcher -->
        <div class="flex items-center gap-3 pt-4">
          {#each locales as locale}
            <a
              href={localizeHref(page.url.pathname, { locale })}
              data-sveltekit-reload
              onclick={() => (isMobileMenuOpen = false)}
              class={[
                "px-3 py-1 text-sm font-semibold rounded uppercase transition-colors",
                getLocale() === locale
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ]}
            >
              {locale}
            </a>
          {/each}
        </div>
      </div>
      <ThemeButton />
    </div>
  {/if}
</nav>
