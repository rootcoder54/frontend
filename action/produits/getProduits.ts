import { BACKEND_URL } from "@/types/constant";
import { Produit } from "@/types/Produit";

export const getProduits = async () => {
  const response = await fetch(`${BACKEND_URL}/api/produits`, {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<Produit[]>;
};
