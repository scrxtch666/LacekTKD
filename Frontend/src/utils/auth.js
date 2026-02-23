// src/utils/auth.js
const API_URL = "http://localhost:3000";

export const authService = {
  // Přihlášení
  async login(login, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Přihlášení selhalo");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  },

  // Odhlášení
  logout() {
    localStorage.removeItem("token");
  },

  // Získání tokenu
  getToken() {
    return localStorage.getItem("token");
  },

  // Kontrola, zda je uživatel přihlášený
  isAuthenticated() {
    return !!this.getToken();
  },

  // Získání informací o uživateli
  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          this.logout(); // Token je neplatný, odhlásíme uživatele
        }
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Chyba při načítání uživatele:", error);
      return null;
    }
  },
};

// getUserRole() pro sidebar - dekóduje přímo z JWT (bez API callu)
export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.role ?? null;
  } catch {
    return null;
  }
}
