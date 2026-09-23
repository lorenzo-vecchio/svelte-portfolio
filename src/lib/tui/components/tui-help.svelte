<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { getCommands } from '../commands';
  import { getDirectKeymap, getLeaderKeymap } from '../keymap';
  import { tui } from '../state.svelte';
  import TuiOverlay from './tui-overlay.svelte';
  import TuiKey from './tui-key.svelte';
  import type { TuiCommandGroup } from '../types';

  const groupLabels: Record<TuiCommandGroup, string> = {
    navigation: m.tui_group_navigation(),
    site: m.tui_group_site(),
    interface: m.tui_group_interface(),
  };

  const chordsByCommand = $derived.by(() => {
    const map = new Map<string, string[]>();
    for (const binding of [...getDirectKeymap(), ...getLeaderKeymap()]) {
      const chords = map.get(binding.commandId) ?? [];
      if (!chords.includes(binding.chord)) chords.push(binding.chord);
      map.set(binding.commandId, chords);
    }
    return map;
  });

  const groups = $derived(
    (['navigation', 'site', 'interface'] as TuiCommandGroup[])
      .map((group) => ({
        group,
        label: groupLabels[group],
        commands: getCommands().filter((command) => command.group === group),
      }))
      .filter((entry) => entry.commands.length > 0),
  );

  const movement = [
    { chords: ['j', 'k'], label: m.tui_help_move() },
    { chords: ['enter'], label: m.tui_help_open_item() },
    { chords: ['h', 'l'], label: m.tui_help_switch_tab() },
  ];
</script>

<TuiOverlay title={m.tui_shortcuts()} onclose={() => tui.closeOverlay()}>
  <div class="tui-scroll max-h-[60vh] space-y-4 p-3">
    {#each groups as entry (entry.group)}
      <section>
        <p class="tui-faint mb-1.5 text-[10px] uppercase tracking-widest">{entry.label}</p>
        <ul class="space-y-1">
          {#each entry.commands as command (command.id)}
            <li class="flex items-center gap-3">
              <span class="flex w-24 shrink-0 gap-1">
                {#each chordsByCommand.get(command.id) ?? [] as chord}
                  <TuiKey wide>{chord}</TuiKey>
                {/each}
              </span>
              <span class="tui-fg">{command.label}</span>
              <span class="tui-dim ml-auto hidden truncate text-[11px] sm:inline">
                {command.description}
              </span>
            </li>
          {/each}
        </ul>
      </section>
    {/each}

    <section>
      <p class="tui-faint mb-1.5 text-[10px] uppercase tracking-widest">
        {m.tui_help_movement()}
      </p>
      <ul class="space-y-1">
        {#each movement as row (row.label)}
          <li class="flex items-center gap-3">
            <span class="flex w-24 shrink-0 gap-1">
              {#each row.chords as chord}
                <TuiKey wide>{chord}</TuiKey>
              {/each}
            </span>
            <span class="tui-fg">{row.label}</span>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</TuiOverlay>
