<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { contacts } from '$lib/conf';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiPageHeader from '../components/tui-page-header.svelte';
  import TuiCommandRow from '../components/tui-command-row.svelte';

  const links = [
    { label: 'GitHub', href: contacts.github },
    { label: 'LinkedIn', href: contacts.linkedin },
    { label: contacts.email, href: `mailto:${contacts.email}` },
  ];
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPageHeader title={m.contact_title()} subtitle={m.contact_subtitle()} file="contact.ts" />

  <TuiPanel title={m.nav_contact()}>
    <div class="space-y-3 p-3 sm:p-4">
      <dl class="space-y-1 text-[12px]">
        <div class="flex gap-3">
          <dt class="tui-faint w-20 shrink-0">location</dt>
          <dd class="tui-dim">{m.contact_location()}</dd>
        </div>
        <div class="flex gap-3">
          <dt class="tui-faint w-20 shrink-0">email</dt>
          <dd class="tui-dim">{contacts.email}</dd>
        </div>
      </dl>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
        {#each links as link (link.label)}
          <a
            class="tui-link text-[11px]"
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            {link.label} ↗
          </a>
        {/each}
      </div>
    </div>
  </TuiPanel>

  <TuiPanel title={m.tui_commands()}>
    <div class="py-1">
      <TuiCommandRow commandId="site.copy-email" />
      <TuiCommandRow commandId="site.open" />
    </div>
  </TuiPanel>
</div>
