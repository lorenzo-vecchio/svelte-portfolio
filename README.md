# lorenzovecchio.dev

A static portfolio built as an engineering drawing sheet: warm paper, technical plates,
and a public register of everything I build. The project list, descriptions, tags, commit
counts, dates and detail pages are generated from my public GitHub repositories.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | [SvelteKit](https://svelte.dev/) 2 with Svelte 5 runes |
| Styling | Tailwind CSS v4 + a custom technical design system |
| Language | TypeScript |
| i18n | [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) — Italian and English |
| Content | Public GitHub repositories, read through the `gh` CLI or the public REST API |
| Markdown | markdown-it + Shiki + sanitize-html |
| Deploy | Static build served by nginx in a multi-stage Docker image |
| Analytics | [Umami](https://umami.is/) — privacy-first, no cookies |

The site is prerendered to static HTML. There is no runtime backend and no database.

## Local development

```bash
npm install
npm run projects:sync   # refresh the GitHub data (authenticated gh CLI)
npm run dev
```

On a fresh clone the generated data is missing; `npm run dev`, `npm run build` and
`npm run check` stop with a clear message if you have not synced yet. You can also use
the anonymous API instead of `gh`:

```bash
npm run projects:sync -- --public
```

The dev server runs at `http://localhost:5173`.

```bash
npm run check           # svelte-check + TypeScript
npm run build           # static build in build/
npm run preview         # preview the production build
npm run generate:og     # regenerate static/og-image.png with Playwright
```

`generate:og` needs Chromium. If Playwright has no browser installed:

```bash
npx playwright install chromium
```

On a machine with a system Chromium, you can point the script at it:

```bash
CHROMIUM_PATH=/usr/bin/chromium npm run generate:og
```

## The GitHub data pipeline

`npm run projects:sync` runs [`scripts/sync-projects.mjs`](scripts/sync-projects.mjs).
It reads the public repositories of
[`lorenzo-vecchio`](https://github.com/lorenzo-vecchio) and collects:

- repository metadata: name, description, homepage, primary language, topics, stars, licence
- the latest commit on the default branch and the total commit count
- the repository README, rendered to HTML with syntax highlighting and rewritten
  relative links (so images and links inside a README keep working from the site)

Two sources are available:

| Command | Source | Requests |
| --- | --- | --- |
| `npm run projects:sync` | authenticated `gh` CLI | ~4 per repo |
| `npm run projects:sync -- --public` | public GitHub REST API, no account | 1 list + 2 per repo |

The public mode needs **37 requests** for the current 18 repositories, below GitHub's
anonymous limit of **60 requests per hour**. It also honors an optional `GITHUB_TOKEN`
environment variable (5,000 requests/hour) if you have one. The Docker build uses the
public mode, so it needs no GitHub account and no `gh` binary.

The script writes:

```
src/lib/data/projects.json          # the register, sorted by last commit (newest first)
src/lib/data/readmes/<repo>.json    # rendered README + table of contents, one file per repo
```

These files are **generated, not committed** — `src/lib/data/` is in `.gitignore`. The
Dockerfile has a dedicated `data` stage that fetches them, and local development runs
`npm run projects:sync` once after cloning.

The output is **idempotent**: it contains no sync timestamps, keys and lists are written
in a stable order, and a file is only rewritten when its content actually changed.
Running the command twice in a row reports `0 files written`.

The build itself never fetches GitHub data: it reads the JSON that is already on disk.

### Choosing repositories

- Forks are excluded automatically.
- `neovim-config` is excluded in the `EXCLUDED` set at the top of the sync script.
- Repositories without a description fall back to the first paragraph of their README.
  If a repository has neither, add an explicit entry to `DESCRIPTION_OVERRIDES`.
- The old and current portfolio repositories are intentionally included.
- Ordering is always by the latest commit on the default branch, newest first.

### Why the date and commit count are build-time data

Both values are fetched during `projects:sync` and stored in `projects.json`. The site
shows the state of GitHub at the last sync, not a live API call. This keeps the site
static, fast, and independent of GitHub rate limits at runtime.

## Project structure

```
scripts/
  sync-projects.mjs       # gh or public API -> stable JSON
  check-data.mjs          # friendly guard before dev/build/check
  generate-og.mjs         # Playwright -> static/og-image.png
  og-template.html        # the 1200x630 social card
src/
  lib/
    components/            # header, footer, register, plate, diagrams, README view
    data/                  # generated GitHub data (gitignored)
    actions/               # reveal, code copy, plate inspection, parallax
    projects.ts            # typed data access
    theme.ts               # light/dark toggle with a view-transition reveal
  routes/
    +page.svelte           # home / drawing sheet
    projects/+page.svelte  # full public register with topic filters
    projects/[slug]/       # README detail page
    privacy/               # privacy policy (Umami)
    sitemap.xml/           # generated sitemap for both locales
    layout.css             # design tokens + component styles
```

## Design notes

- One warm paper ground, one ink, one signal accent. The dark theme is a graphite sheet,
  not an inverted light theme.
- The home page reserves a real left sheet margin for a fixed section index (00–06). A
  single wide drafting grid — 120px modules, 480px major lines, survey marks — drifts
  slowly behind the content.
- The homepage's system plate is an exploded axonometric drawing: interface, service,
  data and a private VPN, with a request path travelling through the layers. The lab
  section uses a rack elevation instead of a generic node diagram.
- The projects page is a split explorer: a readable right-side index lifts the hovered
  or focused title into a sticky left preview with a same-document View Transition. The
  preview details wait until the title settles, then fade in.
- The home project ledger still inverts to ink on hover/focus; clicking a row opens the
  detail plate with a shared title transition.
- Navigation uses the View Transitions API when available, with a CSS fallback.
- The first visit in a session gets a short “plotter registration” intro. It is skipped
  for `prefers-reduced-motion` and for repeat visits.
- The theme toggle uses a radial View Transition when the browser supports it.
- No cookie banner: Umami is configured without cookies or personal identifiers.

## Deploy

```bash
docker build -t portfolio:latest .
docker run -d -p 8080:80 --name portfolio portfolio:latest
```

The image is a multi-stage build:

1. **data** — `node:24-alpine` runs `scripts/sync-projects.mjs --public`, fetching the
   repository metadata, READMEs, commit dates and commit counts from the anonymous
   GitHub REST API. It needs no GitHub account and no `gh` binary.
2. **build** — installs dependencies, copies the generated data from the data stage, and
   runs `npm run build`.
3. Text assets are pre-compressed with gzip.
4. **production** — `nginx:alpine` serves only the static `build/` directory with a custom
   config.

The anonymous API allows 60 requests per hour and the current register uses 37. If the
build runs from an IP that has already used its quota, pass a token as an optional
BuildKit secret instead of baking it into the image:

```bash
docker build --secret id=github_token,src=$HOME/.github_token -t portfolio:latest .
```

The secret file should contain only the token. The build works without it.

nginx is configured for:

- `gzip_static on` (uses the pre-compressed files)
- long-lived caching for hashed `/_app/` assets and fonts
- 30-day caching for images
- `no-cache` HTML
- clean 404 handling with the custom `404.html`
- security headers (`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`)

## Analytics

The Umami script is in `src/app.html` and points at
`https://analytics.lorenzovecchio.dev` with the site's website ID. Umami is configured
to avoid cookies and personal identifiers; the privacy page explains the details.
