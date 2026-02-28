<script lang="ts">
  import { locales, localizeHref, getLocale } from "$lib/paraglide/runtime";
  import { page } from "$app/state";

  type Props = {
    class?: string;
    onswitch?: () => void;
  };

  const { class: className = "", onswitch }: Props = $props();

  const flags: Record<string, { emoji: string; label: string }> = {
    en: { emoji: "🇬🇧", label: "English" },
    it: { emoji: "🇮🇹", label: "Italiano" },
  };
</script>

<div class={["flex items-center gap-1", className].join(" ")}>
  {#each locales as locale}
    {@const flag = flags[locale] ?? { emoji: locale.toUpperCase(), label: locale }}
    <a
      href={localizeHref(page.url.pathname, { locale })}
      data-sveltekit-reload
      onclick={onswitch}
      aria-label={flag.label}
      class={[
        "flex items-center justify-center w-8 h-8 rounded transition-all text-lg",
        getLocale() === locale
          ? "ring-2 ring-primary bg-primary/10 scale-110"
          : "opacity-60 hover:opacity-100",
      ]}
    >
      <span role="img" aria-hidden="true">{flag.emoji}</span>
    </a>
  {/each}
</div>
