# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prázdný string = frontend volá API na stejné doméně ("/api", "/auth", "/uploads"),
# kterou Traefik na základě path prefixu routuje na backend service.
# Pokud chceš API na jiné doméně, přepiš přes --build-arg VITE_API_URL=https://api.example.cz
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
