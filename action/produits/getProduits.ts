import { Produit } from "@/types/Produit";

export const getProduits = async () => {
  const response = await fetch("http://localhost:3000/api/produits", {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<Produit[]>;
};
