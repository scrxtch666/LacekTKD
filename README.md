# 🥋 Restrukturalizace webových stránek oddílu Taekwondo Lacek

Modernizace webových stránek sportovního oddílu **Taekwondo Lacek** v rámci bakalářské práce.

Cílem projektu je vytvořit moderní, responzivní a přehlednou webovou aplikaci pro prezentaci oddílu, sportovců, turnajů a aktualit. Aplikace využívá oddělenou frontendovou a backendovou část, relační databázi a kontejnerizované prostředí pro nasazení.

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=flat&logo=traefikproxy&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 🛠 Použité technologie

| Technologie | Využití |
|---|---|
| **React** | Tvorba komponentového uživatelského rozhraní |
| **Tailwind CSS** | Stylování a responzivní design |
| **JavaScript (ES6+)** | Aplikační logika |
| **Node.js** | Běhové prostředí backendu |
| **Express.js** | Implementace backendového API |
| **MySQL** | Relační databáze |
| **JWT** | Autentizace pomocí tokenů |
| **Docker & Docker Compose** | Kontejnerizace a nasazení |
| **Traefik** | Reverzní proxy a směrování požadavků |
| **Git** | Správa verzí zdrojového kódu |

---

## 📋 TODO – plánované úpravy

### 🔎 Vyhledávání a filtrování

- [ ] Opravit filtrování dat ve vyhledávacích polích.
- [ ] Sjednotit chování filtrů napříč jednotlivými sekcemi.
- [ ] Ověřit správné filtrování při kombinaci více kritérií.

### 🔐 Bezpečnost a autentizace

- [ ] Zajistit kontrolu unikátnosti přihlašovacích e-mailů.
- [ ] Ověřit povinné údaje při registraci a přihlašování.
- [ ] Upravit chybové zprávy tak, aby neodhalovaly interní informace ani detaily implementace.
- [ ] Prověřit validaci vstupů na straně backendu.

### ⚙️ Backend a architektura

- [ ] Zavést DTO (Data Transfer Objects) pro sjednocení dat vracených z API.
- [ ] Sjednotit strukturu odpovědí a chybových stavů API.
- [ ] Zkontrolovat konzistenci validace vstupních dat.

### 🖥️ Uživatelské rozhraní

- [ ] Opravit problikávání stránky 404 při načítání detailu aktuality.
- [ ] Zlepšit stavy načítání dat a zobrazování chyb.
- [ ] Ověřit funkčnost rozhraní na mobilních zařízeních.

### 🧪 Testování a nasazení

- [ ] Otestovat autentizaci a autorizaci jednotlivých endpointů.
- [ ] Ověřit validaci formulářů a chybové stavy.
- [ ] Otestovat čisté spuštění projektu podle dokumentace.
- [ ] Ověřit nasazení přes Docker Compose a směrování pomocí Traefiku.
- [ ] Zkontrolovat ukládání dat a nahraných souborů po restartu kontejnerů.

---

## 🚀 Spuštění projektu lokálně

### 📋 Požadavky

- [Node.js](https://nodejs.org/)
- npm
- MySQL
- Git

### 1. Klonování repozitáře

```bash
git clone https://github.com/scrxtch666/LacekTKD.git
cd LacekTKD
```

### 2. Spuštění frontendu

```bash
cd Frontend
npm install
npm run dev
```

Frontend se standardně spouští na adrese `http://localhost:5173`.

### 3. Spuštění backendu

V novém terminálu:

```bash
cd Backend
npm install
node server.js
```

Backend standardně používá port `3000`, pokud není změněn v konfiguraci.

**Poznámka:** Před spuštěním backendu nakonfiguruj připojení k databázi a ostatní požadované proměnné prostředí v souboru `.env` podle `.env.example`.

---

## 🐳 Nasazení pomocí Docker Compose

Projekt podporuje nasazení pomocí Docker Compose. Prostředí zahrnuje frontend, backend a databázi MySQL. Reverzní proxy Traefik se provozuje samostatně.

### Postup nasazení

1. Zkopíruj `.env.example` do `.env` a doplň potřebné proměnné prostředí.
2. Ověř existenci externí Docker sítě používané Traefikem.
3. V `docker-compose.yml` uprav doménu, entrypointy a certresolver podle své konfigurace.
4. V kořenovém adresáři spusť:

```bash
docker compose up -d --build
```

### Směrování požadavků

- `/api` – backendové API
- `/auth` – autentizační endpointy
- `/uploads` – nahrané soubory
- Ostatní požadavky – frontendová aplikace

Databázová data a nahrané soubory jsou ukládány do pojmenovaných Docker volumes, aby zůstaly zachovány při opětovném vytvoření kontejnerů.

---

## 🎓 Informace o projektu

- **Název:** Restrukturalizace webových stránek oddílu Taekwondo Lacek
- **Typ:** Bakalářská práce
- **Autor:** scrxtch
- **Škola:** Vysoká škola polytechnická Jihlava
- **Zaměření:** Full-stack webový vývoj, databáze, bezpečnost a nasazení aplikací

---

*Projekt vzniká v rámci bakalářské práce s cílem modernizovat webovou prezentaci sportovního oddílu Taekwondo Lacek a vytvořit udržitelný základ pro jeho další rozvoj.*