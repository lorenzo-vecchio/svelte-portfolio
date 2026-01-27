<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="max-w-4xl mx-auto px-6 w-full flex flex-col content-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="mb-4 text-4xl font-bold">{page.status}</h1>
    {#if page.status === 404}
      <p class="mb-4 text-xl text-muted-foreground">
        This is a static site. The file isn't here. It’s not hiding in a
        database, and there’s no backend to go looking for it. It’s just...
        gone.
      </p>
    {:else}
      <p class="mb-4 text-xl text-muted-foreground">
        You’ve officially found a bug! Since I’m building this in public and adding sections weekly, you’re basically a beta tester now. Congratulations? Let’s get you back to a page that actually works.
      </p>
    {/if}
    <a href="/" class="text-primary underline hover:text-primary/90">
      Go home and let's pretend this didn't happen
    </a>
  </div>
</div>
