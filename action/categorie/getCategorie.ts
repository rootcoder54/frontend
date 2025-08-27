import { BACKEND_URL } from "@/types/constant";

export const getCategories = async () => {
  const response = await fetch(`${BACKEND_URL}/api/categories`, {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
