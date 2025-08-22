export const deleteProduit = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/produits/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du produit");
  }
  return response.json();
};
