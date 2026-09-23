<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import type { Project } from '$lib/conf';

  type Props = {
    project: Project;
  };

  let { project }: Props = $props();

  const links = $derived(
    [
      { href: project.liveUrl, label: m.project_btn_live_demo() },
      { href: project.websiteUrl, label: m.project_btn_website_url() },
      { href: project.docsUrl, label: m.project_btn_docs() },
      { href: project.githubUrl, label: m.project_btn_source() },
      { href: project.downloadUrl, label: m.project_btn_download() },
    ].flatMap((link) => (link.href ? [{ href: link.href, label: link.label }] : [])),
  );
</script>

{#if links.length > 0}
  <span class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
    {#each links as link (link.label)}
      <a class="tui-link" href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label} ↗
      </a>
    {/each}
  </span>
{/if}
