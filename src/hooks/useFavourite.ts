import { Product } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavouriteStore {
    items: Product[],
    addItem: (product: Product) => void,
    removeItem: (id: number) => void
    removeAll: () => void
}

const useFavourite = create(
    persist<FavouriteStore>((set, get) => ({
    items: [],
    addItem: (product: Product) =>{
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === product.id);

        if (existingItems) {
            return toast("Item already in Favourites");
        }

        set({ items: [...get().items, product] });
        toast.success("Item added to Favourites");
    },

    removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from Favourites");
    },

    removeAll: () => set({ items: [] })

}), {
    name: "Favourites",
    storage: createJSONStorage(() => localStorage)
})
)

export default useFavourite;