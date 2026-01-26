<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Lorenzo Vecchio | Full-Stack Software Developer</title>
  <meta
    name="description"
    content="Lorenzo Vecchio is a software developer focused on building modern, high-quality web applications. Portfolio, projects, and contact information."
  />
  <link rel="canonical" href="https://lorenzovecchio.dev/" />

</svelte:head>

<ModeWatcher />
<Navbar />
{@render children()}
