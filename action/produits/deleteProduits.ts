export const deleteProduit = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:3000/api/produits/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du produit");
  }
  return response.json();
};
