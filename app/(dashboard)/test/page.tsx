"use client";
import { DataTable } from "@/components/datatables";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProduits } from "@/action/produits/getProduits";
import { Produit } from "@/types/Produit";
import { useState } from "react";
import { DeleteProduit } from "@/components/modals/delete-produit";
import { EditeProduit } from "@/components/modals/edit-produit";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getImageByProduit } from "@/action/produits/getImageByProduit";
import { BACKEND_URL } from "@/types/constant";
import { Spinner } from "@/components/features/spinner";

const PageTest = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const { data: produits, refetch } = useQuery<Produit[]>({
    queryKey: ["produit"],
    queryFn: async () => {
      const data = await getProduits();
      const updatedData = await Promise.all(
        data.map(async (item) => {
          const images = await getImageByProduit(item.id);
          return {
            ...item,
            image: images.length > 0 ? BACKEND_URL + "/" + images[0].url : null
          };
        })
      );

      return updatedData;
    }
  });

  if (!produits)
    return (
      <div className="min-h-screen flex flex-row items-center justify-center">
        {" "}
        <Spinner />
      </div>
    );

  return (
    <div>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Test</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex"
            >
              <a
                href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>
      <div className="px-7">
        <DataTable
          data={produits}
          searchId="nom"
          searchPlaceholder="Rechercher le nom"
          onRowSelect={(id) => setSelectedId(id)}
          links={[
            {
              name: "Ajouter",
              icon: <PlusIcon />,
              lien: "/test/add"
            }
          ]}
          selectlinks={[
            {
              btn: <EditeProduit id={selectedId} reload={refetch} />
            },
            {
              btn: <DeleteProduit id={selectedId} reload={refetch} />
            },
            {
              btn: <Link href={`/test/${selectedId}`}>Details</Link>
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
    </div>
  );
};

export default PageTest;
