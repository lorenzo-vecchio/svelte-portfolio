# 🌐 Personal Website

A high-performance, statically generated personal website built with the modern web stack. This site leverages **SvelteKit Runes** for reactive logic and **Tailwind CSS v4** for styling, all served via a hardened **NGINX** container.

## 🚀 Tech Stack

| **Layer**      | **Technology**                              |
| -------------------- | ------------------------------------------------- |
| **Framework**  | [SvelteKit](https://kit.svelte.dev/)(v2+ with Runes) |
| **Styling**    | [Tailwind CSS v4](https://tailwindcss.com/)          |
| **Runtime**    | Node.js 20 (Build stage)                          |
| **Web Server** | NGINX (Alpine-based)                              |
| **Deployment** | Docker (Multi-stage)                              |

---

## ✨ Performance Features

This project isn't just a basic static export. The deployment pipeline includes several production-grade optimizations:

* **Pre-compressed Assets:** The Docker build stage runs a `gzip` sweep, generating `.gz` versions of all text-based assets to save CPU cycles on the server.
* **Immutable Caching:** NGINX is configured to serve `/_app/` immutable assets with a 1-year `Cache-Control` header.
* **Zero-Downtime SPA Routing:** Handles client-side routing fallback to `index.html` seamlessly.
* **Brotli-Ready:** While currently using Gzip, the structure is ready for Brotli expansion.

---

## 🛠️ Local Development

### Prerequisites

* **Node.js** : v20.x or later
* **npm** : v10.x or later

### Installation & Execution

1. **Clone and Install:**
   **Bash**

   ```
   npm install
   ```
2. **Start Development Server:**
   **Bash**

   ```
   npm run dev
   ```
3. **Build Locally:**
   **Bash**

   ```
   npm run build
   ```

---

## 🐳 Docker Deployment

The deployment uses a **multi-stage Dockerfile** to ensure the final image contains only the NGINX binary and your static files—keeping the footprint minimal.

### Build the Image

**Bash**

```
docker build -t personal-website:latest .
```

### Run the Container

**Bash**

```
docker run -d \
  -p 8080:80 \
  --name my-website \
  personal-website:latest
```

---

## ⚙️ Configuration Deep Dive

### NGINX (`nginx.conf`)

* **`gzip_static on;`** : Tells NGINX to look for the `.gz` files we created in the Dockerfile before compressing them on the fly.
* **Caching Strategy** :
* **HTML** : `no-cache` (always validates so users see the latest version).
* **Assets** : `public, immutable` (max performance for hashed SvelteKit files).

### Dockerfile

* **Stage 1 (Build)** : Uses `node:20-alpine` to install dependencies and run the SvelteKit build. It also performs a manual gzip compression of all static files.
* **Stage 2 (Production)** : Switches to `nginx:alpine`, wipes the default files, and copies only the `/build` folder and our custom config.

---

## 📂 Project Structure

**Plaintext**

```
├── src/             # Svelte components & Runes logic
├── static/          # Raw static assets
├── Dockerfile       # Multi-stage build instructions
├── nginx.conf       # Optimized NGINX server block
├── package.json     # Project dependencies
└── tailwind.config  # Tailwind v4 configuration
```
