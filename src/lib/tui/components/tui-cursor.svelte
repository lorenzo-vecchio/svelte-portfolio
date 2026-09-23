<script lang="ts">
  type Props = {
    variant?: 'default' | 'accent' | 'green';
    class?: string;
  };

  let { variant = 'default', class: className = '' }: Props = $props();
</script>

<span
  class={[
    'tui-cursor',
    variant === 'accent' && 'tui-cursor--accent',
    variant === 'green' && 'tui-cursor--green',
    className,
  ]}
  aria-hidden="true"
></span>
