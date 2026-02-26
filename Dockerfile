# Menggunakan Node.js Alpine sebagai base image untuk build stage yang lebih ringan
FROM node:20-alpine AS builder

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json terlebih dahulu untuk memanfaatkan cache docker layer
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Build aplikasi React/Vite
RUN npm run build

# Menggunakan Nginx Alpine sebagai base image untuk production server
FROM nginx:alpine

# Menyalin konfigurasi Nginx kustom untuk mendukung React Router (opsional tapi disarankan)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Menyalin hasil build aplikasi dari tahap "builder" ke direktori html Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 untuk akses web
EXPOSE 80

# Jalankan Nginx sebagai daemon
CMD ["nginx", "-g", "daemon off;"]
