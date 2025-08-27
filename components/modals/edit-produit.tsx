"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FilePenLine } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { getProduitById } from "@/action/produits/getProduitId";
import { Produit } from "@/types/Produit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { EditeProduitFn } from "@/action/produits/editerProduit";

const formSchema = z.object({
  nom: z.string().min(1, {
    message: "Champ Obligatoire"
  }),
  description: z.string(),
  prix: z.number(),
  quantite: z.number()
});

export function EditeProduit({
  id,
  reload
}: {
  id: string;
  reload: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { data: produit } = useQuery<Produit>({
    queryKey: ["produit", id],
    queryFn: async () => {
      const data = await getProduitById(id);
      return data;
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: produit?.nom || "",
      description: produit?.description || "",
      prix: produit?.prix || 0,
      quantite: produit?.quantite || 0
    }
  });

  useEffect(() => {
    if (produit) {
      form.reset({
        nom: produit.nom,
        description: produit.description || "",
        prix: produit.prix,
        quantite: produit.quantite
      });
    }
  }, [produit, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (produit) {
      EditeProduitFn(
        id,
        values.nom,
        values.description,
        values.prix,
        values.quantite,
        produit.categorieId,
        produit.fournisseurId,
        produit.shopId
      ).then((data) => {
        console.log(data);
        reload();
        setOpen(false);
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FilePenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.{" "}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantité</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
