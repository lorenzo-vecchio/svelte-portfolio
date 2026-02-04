<script lang="ts">
  import type { Project } from "$lib/conf";
  import { Book, Clock, ExternalLink, Github, Zap } from "@lucide/svelte";
  import { Badge } from "./ui/badge";
  import { Button } from "./ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./ui/card";

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
</script>

<Card
  class="card-shadow hover:border-primary/50 transition-colors overflow-hidden"
>
  <div class="flex flex-col md:flex-row">
    <div class="flex-1">
      <CardHeader>
        <div class="flex items-center justify-between gap-2">
          <CardTitle class="text-xl">{project.title}</CardTitle>
          {#if project.status === "active"}
            <Badge
              variant="outline"
              class="text-xs border-green-500/50 text-green-500"
            >
              <Zap class="w-3 h-3 mr-1" />
              Active
            </Badge>
          {:else if project.status === "upcoming"}
            <Badge
              variant="outline"
              class="text-xs border-primary/50 text-primary"
            >
              <Clock class="w-3 h-3 mr-1" />
              Upcoming
            </Badge>
          {:else if project.status === "legacy"}
            <Badge
              variant="outline"
              class="text-xs border-red-400/50 text-red-400"
            >
              Legacy
            </Badge>
          {/if}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-2 mb-4 mt-4">
          {#each project.technologies as tech}
            <Badge variant="secondary" class="font-mono text-xs">
              {tech}
            </Badge>
          {/each}
        </div>
        <div class="flex gap-3">
          {#if project.liveUrl}
            <Button
              size="sm"
              variant="outline"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink class="w-4 h-4 mr-1" />
              Live Demo
            </Button>
          {/if}

          {#if project.githubUrl}
            <Button
              size="sm"
              variant="ghost"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github class="w-4 h-4 mr-1" />
              Source
            </Button>
          {/if}

          {#if project.docsUrl}
            <Button
              size="sm"
              variant="ghost"
              href={project.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Book class="w-4 h-4 mr-1" />
              Docs
            </Button>
          {/if}
        </div>
      </CardContent>
    </div>
  </div>
</Card>
