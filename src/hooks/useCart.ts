import { Product, Quantity } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
    items: Quantity[],
    addItem: (product: Quantity) => void,
    removeItem: (id: number) => void,
    checkItem: (id: number) => boolean,
    updateQuantity: (id: number, quantity: number) => void,
    checkQuantity: (id: number) => number,
    removeAll: () => void
}

const useCart = create(
    persist<CartStore>((set, get) => ({
    items: [],
    addItem: (product: Quantity) =>{
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.product.id === product.product.id);

        if (existingItems) {
            return toast("Item already in cart");
        }

        set({ items: [...get().items, product] });
        toast.success("Item added to cart");
    },

    removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.product.id !== id)] });
        toast.success("Item removed from cart");
    },

    checkItem: (id: number) => {
        return get().items.some((item) => item.product.id === id);
    },

    updateQuantity: (id: number, quantity: number) => {
        set((cart) => {
            const updatedItems = cart.items.map((item) =>
              item.product.id === id ? { ...item, quantity } : item
            );
            return { items: updatedItems };
        });
    },

    checkQuantity: (id: number) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.product.id === id);
        return existingItems ? existingItems.quantity : 0;
    },

    removeAll: () => set({ items: [] })

}), {
    name: "cart",
    storage: createJSONStorage(() => localStorage)
})
)

export default useCart;