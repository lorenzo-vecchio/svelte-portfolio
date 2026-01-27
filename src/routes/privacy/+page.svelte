<script>
  import { contacts } from "$lib/conf";

</script>
<main class="min-h-screen mt-20 px-6 py-20 mx-auto prose md:prose-lg prose-gray dark:prose-invert max-w-4xl">
  <h1>Privacy Policy</h1>
  <p class="last-updated">Last Updated: January 27, 2026</p>

  <p>
    I value your privacy as much as I value my own. This website (<a
      href="https://lorenzovecchio.dev">lorenzovecchio.dev</a
    >) is built to be a fast, clean, and privacy-respecting space.
  </p>

  <section>
    <h2>1. No Cookies</h2>
    <p>
      This website <strong>does not use cookies</strong>. I do not use any
      tracking pixels, advertising beacons, or any other technology that stores
      information on your device or tracks you across the web.
    </p>
  </section>

  <section>
    <h2>2. Privacy-First Analytics</h2>
    <p>
      I use <strong>Umami Analytics</strong> to understand how visitors interact
      with my site (e.g., which projects are the most popular). Umami is a privacy-focused,
      open-source alternative to Google Analytics.
    </p>
    <ul>
      <li>
        <strong>No Personal Data:</strong> Umami does not collect any personally
        identifiable information (PII).
      </li>
      <li>
        <strong>Anonymization:</strong> Your IP address is never stored. It is used
        only to determine general geographic data (like country) and is then immediately
        discarded.
      </li>
      <li>
        <strong>No Tracking:</strong> You are not tracked across different websites
        or devices.
      </li>
    </ul>
  </section>

  <section>
    <h2>3. Data Usage & Sharing</h2>
    <p>
      Any data collected is used strictly for the purpose of improving this
      website and understanding its reach.
    </p>
    <ul>
      <li>I <strong>do not sell</strong> your data.</li>
      <li>
        I <strong>do not share</strong> your data with third parties for marketing
        or advertising purposes.
      </li>
    </ul>
  </section>

  <section>
    <h2>4. Legal Basis (GDPR)</h2>
    <p>
      The processing of anonymous analytical data is based on <strong
        >Legitimate Interest</strong
      > (Article 6(1)(f) of the GDPR). This allows me to improve the website's performance
      and content without impacting your fundamental rights and freedoms, as no personal
      data is processed.
    </p>
  </section>

  <section>
    <h2>5. Your Rights</h2>
    <p>
      Even though I do not collect personal data that could identify you, you
      still have the right to inquire about my data practices. Since no
      individual identifiers are stored, I cannot "delete" or "export" your
      specific data because I have no way of knowing which data belongs to you.
    </p>
  </section>

  <section>
    <h2>6. Contact</h2>
    <p>
      If you have any questions about this policy or the privacy of this site,
      feel free to reach out:
    </p>
    <p>
      <strong>Lorenzo Vecchio</strong><br />
      <a href={"mailto:" + contacts.email}>{contacts.email}</a>
    </p>
  </section>
</main>
