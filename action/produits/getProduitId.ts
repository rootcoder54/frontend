import { BACKEND_URL } from "@/types/constant";

export const getProduitById = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/produits/${id}`, {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
