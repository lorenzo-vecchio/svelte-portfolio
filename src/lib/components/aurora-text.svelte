<script>
  import { cn } from "$lib/utils";
  let className = "";
  export { className as class };
</script>

<span
  class={cn(
    "bg-clip-text text-transparent animate-aurora-text bg-white px-2",
    "bg-[length:300%_300%] bg-no-repeat",
    className,
  )}
>
  <slot>Svelte Aurora</slot>
</span>

<style>
  @keyframes aurora-text {
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

  .animate-aurora-text {
    animation: aurora-text 10s ease infinite;
    background-image: radial-gradient(
        circle at 10% 20%,
        hsl(var(--color-1)) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 90% 80%,
        hsl(var(--color-2)) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 50% 50%,
        hsl(var(--color-3)) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 20% 80%,
        hsl(var(--color-4)) 0%,
        transparent 40%
      );
  }
</style>
