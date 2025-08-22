export const getFournisseurs = async () => {
  const response = await fetch("http://localhost:3000/api/fournisseurs", {
    method: "GET",
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
