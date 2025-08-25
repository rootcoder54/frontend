export const AddImageFn = async (url: string, produitId: string) => {
  const formData = new FormData();
  formData.append("image", url); // ici c'est un File
  formData.append("produitId", produitId);

  const res = await fetch("http://localhost:3000/api/images/", {
    method: "POST",
    body: formData, // pas de headers Content-Type, c'est géré automatiquement
    credentials: "include"
  });

  if (!res.ok) {
    console.error("Erreur upload");
    return;
  }

  const data = await res.json();
  console.log("Upload OK :", data);
  return data;
};
