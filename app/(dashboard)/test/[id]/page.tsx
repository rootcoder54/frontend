"use client";
import { getProduitById } from "@/action/produits/getProduitId";
import { Spinner } from "@/components/features/spinner";
import { Produit } from "@/types/Produit";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setid] = useState("");

  useEffect(() => {
    let isMounted = true;

    params.then((data) => {
      if (isMounted) {
        setid(data.id);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log("ID :", id);

  const { data: produit } = useQuery<Produit>({
    queryKey: ["produitkey", id],
    queryFn: async () => {
      const data = await getProduitById(id);
      return data;
    }
  });
  if (!produit || !produit.categorie) {
    return <Spinner />;
  }

  return (
    <div className="space-y-3 flex flex-col p-6">
      <span>{produit?.nom}</span>
      <span>{produit?.description || ""}</span>
      <span>{produit?.prix}</span>
      <span>{produit?.quantite}</span>
      <span>{produit?.categorie.nom || ""}</span>
      <span>{produit?.categorie.description || ""}</span>
    </div>
  );
};

export default DetailsPage;
