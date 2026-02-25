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
</svelte:head>

<ModeWatcher />
<Navbar />
{@render children()}
<Footer />
