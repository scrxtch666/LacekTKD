// V dev módu (npm run dev) se používá http://localhost:3000.
// V produkčním buildu (Docker) se dá přepsat build-time proměnnou VITE_API_URL
// (viz Frontend/Dockerfile) — prázdný string = volání na stejnou doménu,
// kterou pak Traefik podle path prefixu (/api, /auth, /uploads) routuje na backend.
export default {
  API_URL: import.meta.env?.VITE_API_URL ?? "http://localhost:3000",
};
