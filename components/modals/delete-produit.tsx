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
import { getToken } from "@/lib/getToken";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export function DeleteProduit({
  id,
  reload
}: {
  id: string;
  reload: () => void;
}) {
  const [token, settoken] = useState("");
  useEffect(() => {
    settoken(getToken());
  }, []);

  const supprimer = () => {
    deleteProduit(id, token).then((result) => {
      console.log(result);
      reload();
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
