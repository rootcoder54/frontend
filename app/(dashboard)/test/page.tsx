"use client";
import { DataTable } from "@/components/datatables";
import { buildColumns } from "@/components/datatables/columns";
import { PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProduits } from "@/action/produits/getProduits";
import { Produit } from "@/types/Produit";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DeleteProduit } from "@/components/modals/delete-produit";
import { EditeProduit } from "@/components/modals/edit-produit";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageTest = () => {
  const [id, setId] = useState("");

  const { data: produits, refetch } = useQuery<Produit[]>({
    queryKey: ["produit"],
    queryFn: async () => {
      const data = await getProduits();
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
              btn: <EditeProduit id={id} reload={refetch} />
            },
            {
              btn: <DeleteProduit id={id} reload={refetch} />
            },
            {
              btn: <Link href={`/test/${id}`}>Details</Link>
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
