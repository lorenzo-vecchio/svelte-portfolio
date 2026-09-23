<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { getCommands, findCommand } from '../commands';
  import { getLeaderKeymap } from '../keymap';
  import { tui } from '../state.svelte';
  import TuiOverlay from './tui-overlay.svelte';
  import TuiKey from './tui-key.svelte';
  import type { TuiCommand, TuiCommandGroup } from '../types';

  const groupLabels: Record<TuiCommandGroup, string> = {
    navigation: m.tui_group_navigation(),
    site: m.tui_group_site(),
    interface: m.tui_group_interface(),
  };

  const chordByCommand = $derived(
    new Map(getLeaderKeymap().map((binding) => [binding.commandId, binding.chord])),
  );

  const groups = $derived(
    (['navigation', 'site', 'interface'] as TuiCommandGroup[])
      .map((group) => ({
        group,
        label: groupLabels[group],
        commands: getCommands().filter(
          (command) => command.group === group && chordByCommand.has(command.id),
        ),
      }))
      .filter((entry) => entry.commands.length > 0),
  );

  function activate(command: TuiCommand) {
    findCommand(command.id)?.run();
  }
</script>

<TuiOverlay title={`${m.tui_menu()} · ${m.tui_leader()}`} onclose={() => tui.closeOverlay()}>
  <div class="tui-scroll max-h-[60vh] space-y-4 p-3">
    {#each groups as entry (entry.group)}
      <section>
        <p class="tui-faint mb-1.5 text-[10px] uppercase tracking-widest">{entry.label}</p>
        <div class="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {#each entry.commands as command (command.id)}
            {@const chord = chordByCommand.get(command.id) ?? command.chord}
            <button
              type="button"
              class="tui-row"
              title={command.description}
              onclick={() => activate(command)}
            >
              <TuiKey wide>{chord}</TuiKey>
              <span class="tui-fg truncate">{command.label}</span>
            </button>
          {/each}
        </div>
      </section>
    {/each}
  </div>

  {#snippet footer()}
    <span class="tui-faint">{m.tui_whichkey_hint()}</span>
    <TuiKey onclick={() => tui.closeOverlay()}>esc</TuiKey>
  {/snippet}
</TuiOverlay>
