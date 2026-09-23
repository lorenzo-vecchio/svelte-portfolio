<script lang="ts">
  type Props = {
    title: string;
    subtitle?: string;
    file: string;
  };

  let { title, subtitle, file }: Props = $props();
</script>

<header class="mb-3 flex items-baseline gap-2">
  <span class="tui-faint select-none" aria-hidden="true">#</span>
  <h1 class="tui-accent text-base font-bold tracking-tight sm:text-lg">{title}</h1>
  {#if subtitle}
    <span class="tui-dim truncate text-[11px]">{subtitle}</span>
  {/if}
  <span class="tui-faint ml-auto hidden text-[11px] sm:inline">{file}</span>
</header>
