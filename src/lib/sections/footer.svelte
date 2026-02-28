<script>
  import { contacts } from "$lib/conf";
  import { Github, Linkedin, Mail } from "@lucide/svelte";
  import * as m from "$lib/paraglide/messages";
  import { localizeHref } from "$lib/paraglide/runtime";

  let year = new Date().getFullYear();
</script>
<footer class="py-8 px-6 border-t border-border">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground flex flex-col md:flex-row items-center">
          © {year} Lorenzo Giovanni Vecchio. {m.footer_rights()}
          <a
            href={localizeHref("/privacy")}
            class=" ml-3 text-sm text-muted-foreground hover:text-primary transition-colors underline"
          >
            {m.footer_privacy()}
          </a>
        </p>

        <div class="flex items-center gap-4">
          <a
            href={contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github class="w-5 h-5" />
          </a>
          <a
            href={contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin class="w-5 h-5" />
          </a>
          <a
            href={"mailto:" + contacts.email}
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail class="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
