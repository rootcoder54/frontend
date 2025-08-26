import { Produit } from "@/types/Produit";

export const AddProduitFn = async (
  nom: string,
  description: string,
  prix: number,
  quantite: number,
  categorieId: string,
  fournisseurId: string,
  shopId: string
) => {
  const response = await fetch(`http://localhost:3000/api/produits/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      nom,
      description,
      prix,
      quantite,
      categorieId,
      fournisseurId,
      shopId
    })
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<Produit>;
};
