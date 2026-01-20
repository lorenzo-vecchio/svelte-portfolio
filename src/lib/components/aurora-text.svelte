<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    className?: string;
    children?: Snippet;
  }

  let { children, className }: Props = $props();
</script>

<span class={["aurora-text", className ? className : ""]}>
  {@render children?.()}
</span>
<style>
  .aurora-text {
    position: relative;
    display: inline-block;
    background: linear-gradient(
      120deg,
      #7dd3fc,
      #a78bfa,
      #f472b6,
      #34d399,
      #7dd3fc
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: aurora 12s ease-in-out infinite;
  }

  .aurora-text::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    filter: blur(12px);
    opacity: 0.6;
    z-index: -1;
    background: inherit;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @keyframes aurora {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
