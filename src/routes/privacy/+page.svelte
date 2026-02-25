<script>
  import { contacts } from "$lib/conf";
  import * as m from "$lib/paraglide/messages";
</script>

<main class="min-h-screen mt-20 px-6 py-20 mx-auto prose md:prose-lg prose-gray dark:prose-invert max-w-4xl">
  <h1>{m.privacy_title()}</h1>
  <p class="last-updated">{m.privacy_last_updated()}</p>

  <p>{m.privacy_intro()}</p>

  <section>
    <h2>{m.privacy_h1()}</h2>
    <p>
      {m.privacy_no_cookies()}
    </p>
  </section>

  <section>
    <h2>{m.privacy_h2()}</h2>
    <p>
      {m.privacy_analytics_intro()}
    </p>
    <ul>
      <li>
        <strong>{m.privacy_analytics_li1_title()}</strong> {m.privacy_analytics_li1_body()}
      </li>
      <li>
        <strong>{m.privacy_analytics_li2_title()}</strong> {m.privacy_analytics_li2_body()}
      </li>
      <li>
        <strong>{m.privacy_analytics_li3_title()}</strong> {m.privacy_analytics_li3_body()}
      </li>
    </ul>
  </section>

  <section>
    <h2>{m.privacy_h3()}</h2>
    <p>
      {m.privacy_data_intro()}
    </p>
    <ul>
      <li>{m.privacy_data_li1()}</li>
      <li>{m.privacy_data_li2()}</li>
    </ul>
  </section>

  <section>
    <h2>{m.privacy_h4()}</h2>
    <p>
      {m.privacy_gdpr()}
    </p>
  </section>

  <section>
    <h2>{m.privacy_h5()}</h2>
    <p>
      {m.privacy_rights()}
    </p>
  </section>

  <section>
    <h2>{m.privacy_h6()}</h2>
    <p>
      {m.privacy_contact_intro()}
    </p>
    <p>
      <strong>Lorenzo Vecchio</strong><br />
      <a href={"mailto:" + contacts.email}>{contacts.email}</a>
    </p>
  </section>
</main>
