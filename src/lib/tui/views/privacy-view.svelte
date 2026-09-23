<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { contacts } from '$lib/conf';
  import TuiPanel from '../components/tui-panel.svelte';
  import TuiPageHeader from '../components/tui-page-header.svelte';

  const analytics = [
    { title: m.privacy_analytics_li1_title(), body: m.privacy_analytics_li1_body() },
    { title: m.privacy_analytics_li2_title(), body: m.privacy_analytics_li2_body() },
    { title: m.privacy_analytics_li3_title(), body: m.privacy_analytics_li3_body() },
  ];

  const dataUsage = [m.privacy_data_li1(), m.privacy_data_li2()];
</script>

<div class="mx-auto max-w-3xl space-y-3">
  <TuiPageHeader
    title={m.privacy_title()}
    subtitle={m.privacy_last_updated()}
    file="privacy.md"
  />

  <TuiPanel>
    <p class="tui-fg p-3 text-[12px] leading-relaxed sm:p-4">{m.privacy_intro()}</p>
  </TuiPanel>

  <TuiPanel title={m.privacy_h1()}>
    <p class="tui-dim p-3 text-[12px] leading-relaxed">{m.privacy_no_cookies()}</p>
  </TuiPanel>

  <TuiPanel title={m.privacy_h2()}>
    <div class="space-y-2 p-3 text-[12px]">
      <p class="tui-dim leading-relaxed">{m.privacy_analytics_intro()}</p>
      <ul class="space-y-1">
        {#each analytics as bullet (bullet.title)}
          <li class="flex gap-2">
            <span class="tui-green select-none">-</span>
            <span class="tui-dim leading-relaxed">
              <strong class="tui-fg">{bullet.title}</strong>
              {bullet.body}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </TuiPanel>

  <TuiPanel title={m.privacy_h3()}>
    <div class="space-y-2 p-3 text-[12px]">
      <p class="tui-dim leading-relaxed">{m.privacy_data_intro()}</p>
      <ul class="space-y-1">
        {#each dataUsage as line (line)}
          <li class="tui-dim flex gap-2">
            <span class="tui-green select-none">-</span>
            <span>{line}</span>
          </li>
        {/each}
      </ul>
    </div>
  </TuiPanel>

  <TuiPanel title={m.privacy_h4()}>
    <p class="tui-dim p-3 text-[12px] leading-relaxed">{m.privacy_gdpr()}</p>
  </TuiPanel>

  <TuiPanel title={m.privacy_h5()}>
    <p class="tui-dim p-3 text-[12px] leading-relaxed">{m.privacy_rights()}</p>
  </TuiPanel>

  <TuiPanel title={m.privacy_h6()}>
    <div class="space-y-2 p-3 text-[12px]">
      <p class="tui-dim leading-relaxed">{m.privacy_contact_intro()}</p>
      <p class="tui-fg">
        Lorenzo Vecchio
        <a class="tui-link ml-2" href={`mailto:${contacts.email}`}>{contacts.email}</a>
      </p>
    </div>
  </TuiPanel>
</div>
