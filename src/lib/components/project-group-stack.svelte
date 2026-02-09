<script lang="ts">
  import ProjectCard from "$lib/components/project-card.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Drawer from "$lib/components/ui/drawer";
  import type { ProjectGroup } from "$lib/conf";
  import { Package } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { ScrollArea } from "./ui/scroll-area";

  interface Props {
    index: number;
    group: ProjectGroup;
  }

  let { index, group }: Props = $props();

  let isOpen = $state(false);
  let isDesktop = $state(false);

  const stackCount = $derived(group.projects.length);
  const paddingBottom = $derived(`${Math.min(stackCount - 1, 3) * 5}px`);
  const animationDelay = $derived(`${index * 0.1}s`);

  onMount(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    
    // Set initial value
    isDesktop = mediaQuery.matches;
    
    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      isDesktop = e.matches;
    };
    
    mediaQuery.addEventListener("change", handler);
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  });

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      isOpen = false;
    }
  }
</script>

<!-- Stack button -->
<button
  onclick={() => (isOpen = true)}
  class="relative w-full text-left group animate-fade-in cursor-pointer mt-4 mb-4"
  style:animation-delay={animationDelay}
  style:padding-bottom={paddingBottom}
>
  <!-- Stacked layers behind -->
  {#if stackCount >= 3}
    <Card
      class="absolute inset-x-3.5 top-8 h-[calc(100%-20px)] opacity-35 border-border/50 transition-all duration-300 group-hover:inset-x-2.5 group-hover:top-10"
    />
  {/if}
  {#if stackCount >= 2}
    <Card
      class="absolute inset-x-2 top-2.5 h-[calc(100%-10px)] opacity-55 border-border/60 transition-all duration-300 group-hover:inset-x-1 group-hover:top-3"
    />
  {/if}

  <span
    class="absolute -top-6 inset-x-0 text-xs text-muted-foreground text-center"
  >
    ↓ Click to expand ↓
  </span>

  <!-- Front card -->
  <Card
    class="relative card-shadow border-border hover:border-primary/50 transition-all duration-300 group-hover:-translate-y-0.5 transform group-hover:scale-[1.01]"
  >
    <CardHeader>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Package class="w-5 h-5 text-primary" />
          <CardTitle class="text-xl">{group.groupTitle}</CardTitle>
        </div>
        <Badge variant="outline" class="text-xs border-primary/50 text-primary">
          {group.projects.length} projects
        </Badge>
      </div>
      <CardDescription>{group.groupDescription}</CardDescription>
    </CardHeader>
    {#if group.groupTechnologies}
      <CardContent>
        <div class="flex flex-wrap gap-2">
          {#each group.groupTechnologies as tech (tech)}
            <Badge variant="secondary" class="font-mono text-xs">
              {tech}
            </Badge>
          {/each}
        </div>
      </CardContent>
    {/if}
  </Card>
</button>

<!-- Conditional Dialog/Drawer -->
{#if isDesktop}
  <Dialog.Root bind:open={isOpen}>
    <Dialog.Content class="max-w-3xl max-h-[90vh] p-0 flex flex-col bg-background/50">
      <!-- Header -->
      <div class="rounded-t-lg border-b border-border bg-card px-6 py-5">
        <div class="flex items-center gap-2 mb-1.5">
          <Package class="w-5 h-5 text-primary" />
          <Dialog.Title class="text-2xl font-semibold"
            >{group.groupTitle}</Dialog.Title
          >
          <Badge variant="outline" class="text-xs border-primary/50 text-primary">
            {group.projects.length} progetti
          </Badge>
        </div>
        <Dialog.Description class="text-sm text-muted-foreground">
          {group.groupDescription}
        </Dialog.Description>
        {#if group.groupTechnologies}
          <div class="flex flex-wrap gap-2 mt-3">
            {#each group.groupTechnologies as tech (tech)}
              <Badge variant="secondary" class="font-mono text-xs">
                {tech}
              </Badge>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Project list -->
      <ScrollArea class="flex-1 size-full overflow-y-auto">
        <div class="flex flex-col gap-4 p-7">
          {#each group.projects as project}
            <ProjectCard {project} />
          {/each}
        </div>
      </ScrollArea>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={isOpen}>
    <Drawer.Content class="bg-card min-h-[85vh]">
      <!-- Header -->
      <div class="border-b border-border bg-card px-6 py-5">
        <div class="flex items-center gap-2 mb-1.5">
          <Package class="w-5 h-5 text-primary" />
          <Drawer.Title class="text-2xl font-semibold"
            >{group.groupTitle}</Drawer.Title
          >
          <Badge variant="outline" class="text-xs border-primary/50 text-primary">
            {group.projects.length} progetti
          </Badge>
        </div>
        <Drawer.Description class="text-sm text-muted-foreground">
          {group.groupDescription}
        </Drawer.Description>
        {#if group.groupTechnologies}
          <div class="flex flex-wrap gap-2 mt-3">
            {#each group.groupTechnologies as tech (tech)}
              <Badge variant="secondary" class="font-mono text-xs">
                {tech}
              </Badge>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Project list -->
      <ScrollArea class="flex-1 size-full overflow-y-auto bg-background">
        <div class="flex flex-col gap-4 p-7">
          {#each group.projects as project}
            <ProjectCard {project} />
          {/each}
        </div>
      </ScrollArea>
    </Drawer.Content>
  </Drawer.Root>
{/if}