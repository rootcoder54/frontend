export const AddImageFn = async (file: File, produitId: string) => {
  const formData = new FormData();
  formData.append("image", file); // ✅ ici on envoie un File
  formData.append("produitId", produitId);

  const res = await fetch("http://localhost:3000/api/images/", {
    method: "POST",
    body: formData, // ✅ FormData gère les headers automatiquement
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
