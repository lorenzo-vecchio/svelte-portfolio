<script lang="ts">
  import { findCommand } from '../commands';
  import TuiKey from './tui-key.svelte';

  type Props = {
    commandId: string;
    showDescription?: boolean;
  };

  let { commandId, showDescription = true }: Props = $props();

  const command = $derived(findCommand(commandId));
</script>

{#if command}
  <button type="button" class="tui-row" title={command.description} onclick={() => command.run()}>
    <TuiKey wide>{command.chord}</TuiKey>
    <span class="tui-fg truncate">{command.label}</span>
    {#if showDescription}
      <span class="tui-dim ml-auto hidden truncate text-[11px] sm:inline">
        {command.description}
      </span>
    {/if}
  </button>
{/if}
