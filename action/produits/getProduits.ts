export const getProduits = async (token: string) => {
  const response = await fetch("http://localhost:3000/api/produits", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
