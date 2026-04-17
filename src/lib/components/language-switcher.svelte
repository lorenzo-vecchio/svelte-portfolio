<script lang="ts">
  import { locales, localizeHref, getLocale } from "$lib/paraglide/runtime";
  import { page } from "$app/state";

  type Props = {
    class?: string;
    onswitch?: () => void;
  };

  const { class: className = "", onswitch }: Props = $props();
</script>

<div class={["flex items-center gap-0.5", className].join(" ")}>
  {#each locales as locale, i}
    {@const active = getLocale() === locale}
    <a
      href={localizeHref(page.url.pathname, { locale })}
      data-sveltekit-reload
      onclick={onswitch}
      aria-label={locale.toUpperCase()}
      class={[
        "px-1.5 py-0.5 text-sm rounded transition-all",
        active
          ? "font-bold text-foreground"
          : "font-light text-muted-foreground hover:text-foreground",
      ]}
    >
      {locale}
    </a>
    {#if i < locales.length - 1}
      <span class="text-muted-foreground/40 text-sm select-none">|</span>
    {/if}
  {/each}
</div>
