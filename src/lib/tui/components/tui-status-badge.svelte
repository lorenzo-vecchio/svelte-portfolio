<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import type { Project } from '$lib/conf';

  type Props = {
    status: Project['status'];
  };

  let { status }: Props = $props();

  const styles: Record<Project['status'], { label: string; color: string }> = {
    active: { label: m.project_status_active(), color: 'tui-green' },
    upcoming: { label: m.project_status_upcoming(), color: 'tui-yellow' },
    legacy: { label: m.project_status_legacy(), color: 'tui-dim' },
  };

  const style = $derived(styles[status]);
</script>

<span class={['shrink-0 text-[10px]', style.color]}>[{style.label}]</span>
