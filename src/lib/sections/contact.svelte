<script>
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent } from "$lib/components/ui/card";
  import { contacts } from "$lib/conf";
  import { Linkedin, Mail, MapPin } from "@lucide/svelte";
  import * as m from "$lib/paraglide/messages";
</script>

<section id="contact" class="py-20 px-6 bg-secondary/30">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-2 text-foreground">
      {m.contact_title()}
    </h2>
    <p class="text-muted-foreground mb-12 max-w-xl mx-auto">
      {m.contact_subtitle()}
    </p>

    <Card class="card-shadow max-w-md mx-auto animate-fade-in">
      <CardContent class="p-8 space-y-6">
        <div
          class="flex items-center justify-center gap-3 text-muted-foreground"
        >
          <MapPin class="w-5 h-5 text-primary" />
          <span>{m.contact_location()}</span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={"mailto:" + contacts.email}
            size="lg"
            class="flex flex-row"
          >
            <Mail class="w-4 h-4 mr-2" />
            {m.contact_btn_email()}
          </Button>
          <Button
            variant="outline"
            href={contacts.linkedin}
            size="lg"
            class="flex flex-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin class="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
