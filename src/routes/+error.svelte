<script lang="ts">
  import { page } from "$app/state";
  import * as m from "$lib/paraglide/messages";
</script>

<main class="max-w-4xl mx-auto px-6 w-full flex flex-col content-center justify-center min-h-screen">
  <div class="text-center">
    <h1 class="mb-4 text-4xl font-bold">{page.status}</h1>
    {#if page.status === 404}
      <p class="mb-4 text-xl text-muted-foreground">
        {m.error_404_message()}
      </p>
    {:else}
      <p class="mb-4 text-xl text-muted-foreground">
        {m.error_generic_message()}
      </p>
    {/if}
    <a href="/" class="text-primary underline hover:text-primary/90">
      {m.error_go_home()}
    </a>
  </div>
</main>
