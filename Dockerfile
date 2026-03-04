# ============================================================
# Stage 1: Build - Compile TypeScript & bundle with Vite
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build production bundle
RUN npm run build

# ============================================================
# Stage 2: Serve - Caddy static file server
# ============================================================
FROM caddy:2-alpine

# Copy Caddyfile configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy built assets from builder stage
COPY --from=builder /app/dist /srv

# Expose port 80 (Caddy HTTP)
EXPOSE 80

# Caddy runs automatically via its default entrypoint
