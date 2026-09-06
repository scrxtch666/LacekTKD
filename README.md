# RESTRUKTUALIZACE WEBOVÝCH STRÁNEK
Použité technologie:
        - React
        - TailWindCSS
        - NodeJS

# SPUŠTĚNÍ
Frontend - cd .\Frontend\ - npm run dev
Backend - cd  .\Backend\ - node server.js

# SPUŠTĚNÍ PŘES DOCKER COMPOSE
Projekt běží za Traefikem (reverse proxy) — `docker-compose.yml` obsahuje
backend, frontend i MySQL databázi, Traefik samotný v něm není a musí už
běžet a mít vytvořenou externí síť (v `docker-compose.yml` navázanou pod
jménem `traefik_default` — pokud tvůj Traefik síť pojmenoval jinak, uprav
`networks.traefik.name`).

1. Zkopíruj `.env.example` → `.env` a doplň všechny proměnné (DB
   přihlašovací údaje i zbytek backendu — `ACCES_TOKEN_SECRET`,
   `REFRESH_TOKEN_SECRET`, `MAP_API`, `JWT_EXPIRES_IN`,
   `GOOGLE_CALENDAR_ID`, `PORT`, `CORS_ORIGIN`). Je to jediný `.env`
   v projektu, `docker-compose.yml` z něj čte proměnné jak pro `db`,
   tak (přes `environment:`) pro `backend`.
2. `docker network ls` — over si, že síť s Traefikem existuje pod
   jménem, na které odkazuje `networks.traefik.name`.
3. V `docker-compose.yml` uprav doménu (`tvedomena.cz`) a případně jména
   entrypointů/certresolveru podle své reálné Traefik konfigurace.
4. `docker compose up -d --build`

Frontend poběží na Traefikem routované doméně, `/api`, `/auth` a `/uploads`
Traefik nasměruje na backend, zbytek na frontend. Nahrané soubory
(`Backend/public/uploads`) a data MySQL (`/var/lib/mysql`) jsou v
pojmenovaných volumes (`uploads`, `db_data`), takže přežijí redeploy.