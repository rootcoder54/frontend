"use client";

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

export function DeleteProduit() {
  const id = useDeleteProduitModal((state) => state.id);
  const isOpen = useDeleteProduitModal((state) => state.isOpen);
  const onClose = useDeleteProduitModal((state) => state.onClose);

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
          <AlertDialogAction>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
