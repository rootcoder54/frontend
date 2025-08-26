import { Image } from "@/types/Image";

export const getImageByProduit = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/images/produits/${id}`, {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json() as Promise<Image[]>;
};
