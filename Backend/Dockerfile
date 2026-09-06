FROM node:20-alpine

WORKDIR /app

# Instalace závislostí zvlášť kvůli cache vrstvy
COPY package*.json ./
RUN npm ci --omit=dev

# Zdrojové soubory
COPY . .

# Sem multer ukládá nahrané soubory (banners/events/fighters/sponsors/tournaments) —
# v produkci na tuto cestu připoj volume, ať upload přežije redeploy.
RUN mkdir -p public/uploads && chown -R node:node /app

USER node

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
