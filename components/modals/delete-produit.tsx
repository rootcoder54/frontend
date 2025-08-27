"use client";

import { deleteProduit } from "@/action/produits/deleteProduits";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteProduit({
  id,
  reload
}: {
  id: string;
  reload: () => void;
}) {
  const router = useRouter();
  const supprimer = () => {
    deleteProduit(id).then((result) => {
      console.log(result);
      toast.success(`Produit ${result.produit.nom} supprimer`);
      reload();
      router.replace("/test");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irreversible. Cet produit sera permanenment
            supprimé de votre compte.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={supprimer}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
