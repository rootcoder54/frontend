"use client";
import { DataTable } from "@/components/datatables";
import { buildColumns } from "@/components/datatables/columns";
import { FilePenLine, PlusIcon, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProduits } from "@/action/produits/getProduits";
import { getToken } from "@/lib/getToken";
import { Produit } from "@/types/Produit";
import { useEffect, useState } from "react";
import { useDeleteProduitModal } from "@/hooks/modals/produit/useDeleteProduit";
import { useSearchParams } from "next/navigation";

const PageTest = () => {
  const [token, settoken] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    settoken(getToken());
  }, []);
  const { data: produits } = useQuery<Produit[]>({
    queryKey: ["produit"],
    queryFn: async () => {
      const data = await getProduits(token);
      return data;
    }
  });
  const deleteProduit = useDeleteProduitModal();

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  useEffect(() => {
    if (search) {
      setId(search);
    }
  }, [search, id]);

  if (!produits) return <span>En cours</span>;
  const columns = buildColumns(produits);
  console.log(produits);

  return (
    <div className="p-9">
      page test
      <DataTable
        columns={columns}
        data={produits}
        searchId="nom"
        searchPlaceholder="Rechercher le nom"
        links={[
          {
            name: "Ajouter",
            icon: <PlusIcon />,
            lien: "/test/add"
          }
        ]}
        selectlinks={[
          {
            name: "Editer",
            icon: <FilePenLine />,
            action: () => deleteProduit.onOpen(id),
            className: "ghost"
          },
          {
            name: "Supprimer",
            icon: <Trash2 />,
            action: () => deleteProduit.onOpen(id),
            className: "ghost"
          }
        ]}
        hideList={[
          "categorieId",
          "shopId",
          "shop",
          "categorie",
          "fournisseur",
          "images",
          "commande",
          "mouvements",
          "createdAt",
          "updatedAt",
          "fournisseurId"
        ]}
      />
    </div>
  );
};

export default PageTest;
