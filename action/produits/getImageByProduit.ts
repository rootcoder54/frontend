import { BACKEND_URL } from "@/types/constant";
import { Image } from "@/types/Image";

export const getImageByProduit = async (id: string) => {
  const response = await fetch(`${BACKEND_URL}/api/images/produits/${id}`, {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<Image[]>;
};
