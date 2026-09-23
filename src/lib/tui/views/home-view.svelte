<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { contacts } from '$lib/conf';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiCommandRow from '../components/tui-command-row.svelte';
  import TuiCursor from '../components/tui-cursor.svelte';

  const quickActions = ['go.about', 'go.projects', 'go.skills', 'go.experience', 'go.contact', 'go.privacy'];
  const links = [
    { label: 'GitHub', href: contacts.github },
    { label: 'LinkedIn', href: contacts.linkedin },
    { label: 'Email', href: `mailto:${contacts.email}` },
  ];
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPanel title="README.md">
    <div class="space-y-3 p-3 sm:p-4">
      <pre class="tui-accent overflow-x-auto text-[9px] leading-[1.15] sm:text-[11px]" aria-hidden="true">
 ██╗      ██████╗ ██╗   ██╗
 ██║     ██╔════╝ ██║   ██║
 ██║     ██║  ███╗██║   ██║
 ██║     ██║   ██║╚██╗ ██╔╝
 ███████╗╚██████╔╝ ╚████╔╝
 ╚══════╝ ╚═════╝   ╚═══╝</pre>

      <p class="tui-dim text-[11px]">// {m.hero_status()}</p>

      <h2 class="text-base sm:text-xl">
        <span class="tui-dim">{m.hero_greeting()} </span>
        <span class="tui-accent font-bold">Lorenzo Giovanni Vecchio</span>
        <TuiCursor variant="accent" class="ml-1" />
      </h2>

      <p class="tui-fg text-[12px] leading-relaxed">{m.hero_subtitle()}</p>

      <dl class="grid gap-1 text-[11px] sm:grid-cols-2">
        <div class="flex gap-2">
          <dt class="tui-faint w-16 shrink-0">location</dt>
          <dd class="tui-dim">{m.hero_location()}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="tui-faint w-16 shrink-0">company</dt>
          <dd class="tui-dim">PwC Italy</dd>
        </div>
      </dl>
    </div>
  </TuiPanel>

  <div class="grid gap-3 sm:grid-cols-2">
    <TuiPanel title={m.tui_group_navigation()}>
      <div class="py-1">
        {#each quickActions as commandId (commandId)}
          <TuiCommandRow {commandId} />
        {/each}
      </div>
    </TuiPanel>

    <TuiPanel title={m.nav_contact()}>
      <div class="space-y-2 p-3 text-[12px]">
        <p class="tui-dim">{m.contact_subtitle()}</p>
        <ul class="space-y-1">
          {#each links as link (link.label)}
            <li>
              <a
                class="tui-link"
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {link.label} ↗
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </TuiPanel>
  </div>
</div>
