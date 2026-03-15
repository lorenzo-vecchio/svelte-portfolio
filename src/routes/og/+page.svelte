<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div
  id="og-image"
  style="
    width: 1200px;
    height: 630px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: #000;
    overflow: hidden;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    display: flex;
    align-items: center;
  "
>
  <!-- Blob top-right -->
  <div style="
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: oklch(0.6132 0.2294 291.7437 / 0.18);
    filter: blur(90px);
    top: -200px;
    right: -80px;
    pointer-events: none;
  "></div>

  <!-- Blob bottom-left -->
  <div style="
    position: absolute;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: oklch(0.6132 0.2294 291.7437 / 0.22);
    filter: blur(80px);
    bottom: -120px;
    left: -60px;
    pointer-events: none;
  "></div>

  <!-- Content -->
  <div style="padding: 0 88px; position: relative; z-index: 1;">
    <div style="
      color: oklch(0.6132 0.2294 291.7437);
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 24px;
      letter-spacing: -0.01em;
    ">lorenzovecchio.dev</div>

    <h1 style="
      color: #fff;
      font-size: 86px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.04em;
      margin: 0 0 32px 0;
    ">Lorenzo Giovanni<br>Vecchio</h1>

    <p style="
      color: rgba(255,255,255,0.45);
      font-size: 30px;
      font-weight: 400;
      margin: 0;
    ">Full Stack Developer &nbsp;·&nbsp; PwC Italy</p>
  </div>
</div>
