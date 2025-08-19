"use client";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return "Pas de token";
  return token;
};
