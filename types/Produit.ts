import { Categorie } from "./Categorie";

export type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  quantite: number;
  categorie: Categorie;
  categorieId: string;
  fournisseurId: string;
  shopId: string;
};
