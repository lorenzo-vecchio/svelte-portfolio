<script>
  import { experiences } from "$lib/conf";
  import Item from "./item.svelte";
</script>

<div class="relative">
  <!-- Timeline line -->
  <div class="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

  <div class="space-y-8">
    {#each experiences as exp, index}
      <Item {exp} {index} />
    {/each}
  </div>
</div>
