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
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useDeleteProduitModal } from "@/hooks/modals/produit/useDeleteProduit";
import { getToken } from "@/lib/getToken";
import { useEffect, useState } from "react";

export function DeleteProduit() {
  const id = useDeleteProduitModal((state) => state.id);
  const isOpen = useDeleteProduitModal((state) => state.isOpen);
  const onClose = useDeleteProduitModal((state) => state.onClose);
  const [token, settoken] = useState("");
  useEffect(() => {
    settoken(getToken());
  }, []);

  const supprimer = () => {
    deleteProduit(id, token).then((result) => {
      console.log(result);
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes vous absolument sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irreversible. Cet produit sera permanenment
            supprimé de votre compte.
            {id}
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
