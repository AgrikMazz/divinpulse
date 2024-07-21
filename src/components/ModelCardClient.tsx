"use client";

import useCart from "@/hooks/useCart";
import { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { Product } from "@/types/types";
import { useRouter } from "next/navigation";

interface Props {
    product: Product
}

const ModelCardClient: React.FC<Props> = ({product}) => {
    const router = useRouter();
    const cart = useCart();

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        cart.addItem(product);
    }

    return (
        <div className="flex justify-center">
            <Button size="sm" className=" bg-yellow-300 hover:bg-yellow-400 w-full transition text-black font-semibold m-2" onClick={onAddToCart}>Add to cart</Button>
            <Button size="sm" className=" bg-yellow-300 hover:bg-yellow-400 w-full transition text-black font-semibold m-2" onClick={() => router.push(`/product/${String(product.id)}`)}>View Product</Button>
        </div>
    );
}
 
export default ModelCardClient;
