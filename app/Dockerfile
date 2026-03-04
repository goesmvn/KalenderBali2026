# ============================================================
# Stage 1: Build - Compile TypeScript & bundle with Vite
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ============================================================
# Stage 2: Production - Nginx static (tanpa Caddy)
# ============================================================
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80