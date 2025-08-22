export const EditeProduitFn = async (
  id: string,
  nom: string,
  description: string,
  prix: number,
  quantite: number,
  categorieId: string,
  fournisseurId: string,
  shopId: string
) => {
  const response = await fetch(`http://localhost:3000/api/produits/${id}`, {
    method: "PUT",
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
  return response.json();
};
