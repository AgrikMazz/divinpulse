import { Product } from "@/types/types";
import { MouseEventHandler } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
    items: Product[],
    addItem: (product: Product) => void,
    removeItem: (id: number) => void,
    checkItem: (id: number) => boolean,
    removeAll: () => void
}

const useCart = create(
    persist<CartStore>((set, get) => ({
    items: [],
    addItem: (product: Product) =>{
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === product.id);

        if (existingItems) {
            return toast("Item already in cart");
        }

        set({ items: [...get().items, product] });
        toast.success("Item added to cart");
    },

    removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart");
    },

    checkItem: (id: number) => {
        return get().items.some((item) => item.id === id);
    },

    removeAll: () => set({ items: [] })

}), {
    name: "cart",
    storage: createJSONStorage(() => localStorage)
})
)

export default useCart;