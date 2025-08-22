"use client";
import { useState, useEffect, useCallback } from "react";

type User = {
  userId: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    roleId: string;
    shopId?: string;
  };
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Récupérer le profil depuis le backend
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        method: "GET",
        credentials: "include" // ⚡ envoie le cookie
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user || data.payload);
    } catch (err) {
      console.error("Erreur lors du fetch du profil", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Login
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          credentials: "include", // ⚡ cookie stocké par le navigateur
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
          //const data = await res.json();
          //throw new Error(data.error || "Erreur de connexion");
          return null;
        }

        await fetchProfile(); // récupère les infos après login
      } catch (err) {
        console.log(err);
      }
    },
    [fetchProfile]
  );

  // 🔹 Logout
  const logout = useCallback(async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include" // ⚡ supprime le cookie côté serveur
      });
      setUser(null);
    } catch (err) {
      console.error("Erreur lors du logout", err);
    }
  }, []);

  // Charger le profil au montage du hook
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { user, loading, login, logout, fetchProfile };
}
