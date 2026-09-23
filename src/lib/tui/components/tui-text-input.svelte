<script lang="ts">
  import TuiCursor from './tui-cursor.svelte';

  type Props = {
    value?: string;
    placeholder?: string;
    ariaLabel?: string;
    autofocus?: boolean;
    onsubmit?: (value: string) => void;
    onescape?: () => void;
    onnavigate?: (delta: number) => void;
  };

  let {
    value = $bindable(''),
    placeholder = '',
    ariaLabel = '',
    autofocus = true,
    onsubmit,
    onescape,
    onnavigate,
  }: Props = $props();

  let input = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (autofocus) input?.focus();
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onsubmit?.(value);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onescape?.();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      onnavigate?.(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      onnavigate?.(-1);
    }
  }
</script>

<div class="relative w-full">
  <input
    bind:this={input}
    bind:value
    class="tui-input text-transparent"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"
    aria-label={ariaLabel || placeholder}
    onkeydown={handleKeydown}
  />
  <div
    class="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre"
  >
    {#if value}
      <span class="tui-fg">{value}</span>
    {:else}
      <span class="tui-faint">{placeholder}</span>
    {/if}
    <TuiCursor variant="accent" />
  </div>
</div>
