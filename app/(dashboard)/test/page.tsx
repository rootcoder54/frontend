"use client";
import { DataTable } from "@/components/datatables";
import { buildColumns } from "@/components/datatables/columns";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProduits } from "@/action/produits/getProduits";
import { getToken } from "@/lib/getToken";
import { Produit } from "@/types/Produit";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DeleteProduit } from "@/components/modals/delete-produit";
import { EditeProduit } from "@/components/modals/edit-produit";

const PageTest = () => {
  const [token, settoken] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    settoken(getToken());
  }, []);
  const { data: produits, refetch } = useQuery<Produit[]>({
    queryKey: ["produit"],
    queryFn: async () => {
      const data = await getProduits(token);
      return data;
    }
  });

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
            btn: <EditeProduit id={id} />
          },
          {
            btn: <DeleteProduit id={id} reload={refetch} />
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
