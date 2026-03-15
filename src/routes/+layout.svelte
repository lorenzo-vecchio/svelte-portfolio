<script lang="ts">
  import "./layout.css";
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar.svelte";
  import Footer from "$lib/sections/footer.svelte";
  import * as m from "$lib/paraglide/messages";
  import { locales, localizeHref } from "$lib/paraglide/runtime";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<svelte:head>
  <title>{m.meta_title()}</title>
  <meta name="description" content={m.meta_description()} />
  <link rel="canonical" href="https://lorenzovecchio.dev/" />
  {#each locales as locale}
    <link
      rel="alternate"
      hreflang={locale}
      href={"https://lorenzovecchio.dev" + localizeHref(page.url.pathname, { locale })}
    />
  {/each}
  <link rel="alternate" hreflang="x-default" href="https://lorenzovecchio.dev/" />

  <!-- Open Graph (WhatsApp, Facebook, LinkedIn) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://lorenzovecchio.dev/" />
  <meta property="og:title" content={m.meta_title()} />
  <meta property="og:description" content={m.meta_description()} />
  <meta property="og:image" content="https://lorenzovecchio.dev/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Lorenzo Giovanni Vecchio — Full Stack Developer" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content="lorenzovecchio.dev" />

  <!-- X/Twitter (only card type needed — falls back to OG for the rest) -->
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<ModeWatcher />
<Navbar />
{@render children()}
<Footer />
