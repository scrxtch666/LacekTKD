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
běžet a mít vytvořenou externí síť `traefik`.

1. Zkopíruj `.env.example` → `.env` a doplň přihlašovací údaje k DB
   (`DB_ROOT_PASSWORD`, `DB_USER`, `DB_PASS`, `DB_NAME`).
2. Zkopíruj `Backend/.env.example` → `Backend/.env` a doplň zbytek
   proměnných (`ACCES_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `MAP_API`,
   `JWT_EXPIRES_IN`, `GOOGLE_CALENDAR_ID`, `PORT`) — `DB_*` odsud se při
   spuštění přes compose přebijí hodnotami z kořenového `.env`.
3. Pokud síť `traefik` ještě neexistuje: `docker network create traefik`.
4. V `docker-compose.yml` uprav doménu (`tvedomena.cz`) a případně jména
   entrypointů/certresolveru podle své reálné Traefik konfigurace.
5. `docker compose up -d --build`

Frontend poběží na Traefikem routované doméně, `/api`, `/auth` a `/uploads`
Traefik nasměruje na backend, zbytek na frontend. Nahrané soubory
(`Backend/public/uploads`) a data MySQL (`/var/lib/mysql`) jsou v
pojmenovaných volumes (`uploads`, `db_data`), takže přežijí redeploy.