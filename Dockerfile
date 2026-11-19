# syntax=docker/dockerfile:1

# ---------- GitHub data stage ----------
# Fetches the public repository data with the anonymous GitHub REST API.
# The current register needs 37 requests, below the 60/hour anonymous limit.
# An optional BuildKit secret can raise the limit without baking a token in:
#   docker build --secret id=github_token,src=/path/to/token .
FROM node:24-alpine AS data

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY scripts/sync-projects.mjs ./scripts/sync-projects.mjs

RUN --mount=type=secret,id=github_token,required=false \
    GITHUB_TOKEN="$(cat /run/secrets/github_token 2>/dev/null || true)" \
    node scripts/sync-projects.mjs --public


# ---------- Build stage ----------
FROM node:24-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# The generated data is gitignored and produced by the data stage above.
COPY --from=data /app/src/lib/data ./src/lib/data

# Build static site. The data stage already refreshed GitHub data, so the
# build-time refresh is skipped here to keep the API quota for one fetch per image.
RUN SKIP_GITHUB_SYNC=1 npm run build

# Pre-compress static assets (gzip)
RUN find build -type f \
  \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.svg" -o -name "*.json" -o -name "*.xml" -o -name "*.txt" -o -name "*.woff" -o -name "*.woff2" \) \
  -exec gzip -k -9 {} \;


# ---------- Production stage ----------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the built SvelteKit site
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
