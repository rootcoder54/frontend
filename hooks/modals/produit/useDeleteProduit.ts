import { create } from "zustand";

type DeleteProduitModalStore = {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useDeleteProduitModal = create<DeleteProduitModalStore>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined })
}));