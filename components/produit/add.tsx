"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Textarea } from "../ui/textarea";
import { Categorie } from "@/types/Categorie";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/action/categorie/getCategorie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Fournisseur } from "@/types/Fournisseur";
import { getFournisseurs } from "@/action/fournisseur/getFournisseurs";
import { useEffect, useState } from "react";
import { AddProduitFn } from "@/action/produits/addProduit";
import { useRouter } from "next/navigation";
import { FileUpload } from "../ui/file-upload";
import { AddImageFn } from "@/action/produits/addImage";
import { toast } from "sonner";

const formSchema = z.object({
  nom: z.string().min(1, {
    message: "Champ Obligatoire"
  }),
  description: z.string(),
  prix: z.number(),
  quantite: z.number(),
  categorieId: z.string().min(1, {
    message: "Champ Obligatoire"
  }),
  fournisseurId: z.string().min(1, {
    message: "Champ Obligatoire"
  }),
  shopId: z.string().min(1, {
    message: "Champ Obligatoire"
  })
});

export function AddProduit() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  const { user } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      description: "",
      prix: 0,
      quantite: 0,
      categorieId: "",
      fournisseurId: "",
      shopId: ""
    }
  });

  const { data: categories } = useQuery<Categorie[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getCategories();
      return data;
    }
  });

  const { data: fournisseurs } = useQuery<Fournisseur[]>({
    queryKey: ["fournisseurs"],
    queryFn: async () => {
      const data = await getFournisseurs();
      return data;
    }
  });
  useEffect(() => {
    if (user) {
      form.reset({
        shopId: user.user.shopId
      });
    }
  }, [user, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    AddProduitFn(
      values.nom,
      values.description,
      values.prix,
      values.quantite,
      values.categorieId,
      values.fournisseurId,
      values.shopId
    ).then((data) => {
      console.log(data, files);
      if (files.length > 0) {
        files.map((file) => {
          AddImageFn(file, data.id).then((val) => {
            console.log(val);
            toast.success(`Produit ${data.nom} ajouter avec succes`);
            router.push("/test");
          });
        });
      } else {
        toast.success(`Produit ${data.nom} ajouter avec succes`);
        router.push("/test");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea {...field} />
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
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FileUpload onChange={handleFileUpload} />
        <FormField
          control={form.control}
          name="categorieId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Categories</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories?.find((cat) => cat.id === field.value)?.nom
                        : "Selectionné la categorie"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Recherche Categorie..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Categorie found.</CommandEmpty>
                      <CommandGroup>
                        {categories?.map((cat) => (
                          <CommandItem
                            value={cat.nom}
                            key={cat.id}
                            onSelect={() => {
                              form.setValue("categorieId", cat.id);
                            }}
                          >
                            {cat.nom}
                            <Check
                              className={cn(
                                "ml-auto",
                                cat.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fournisseurId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fournisseurs</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? fournisseurs?.find((cat) => cat.id === field.value)
                            ?.nom
                        : "Selectionné le fournisseur"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Recherche Categorie..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No fournisseur found.</CommandEmpty>
                      <CommandGroup>
                        {fournisseurs?.map((cat) => (
                          <CommandItem
                            value={cat.nom}
                            key={cat.id}
                            onSelect={() => {
                              form.setValue("fournisseurId", cat.id);
                            }}
                          >
                            {cat.nom}
                            <Check
                              className={cn(
                                "ml-auto",
                                cat.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
}
