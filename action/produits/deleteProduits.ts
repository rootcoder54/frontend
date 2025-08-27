import { BACKEND_URL } from "@/types/constant";
import { Produit } from "@/types/Produit";

export const deleteProduit = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/produits/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du produit");
  }
  return response.json() as Promise<{ produit: Produit }>;
};
