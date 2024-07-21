"use client";

import { Product } from "@/types/types";
import loadImage from "@/app/actions/loadImage";
import { Button } from "./ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import { MouseEventHandler } from "react";

interface Props {
    product: Product
}

const ModelCard: React.FC<Props> = ({ product }) => {
    const cart = useCart();

    const imagePath = loadImage(product);

    return (
        <div className="bg-white overflow-hidden flex flex-col rounded-lg m-4 p-2 max-w-72 transition hover:scale-105">
            <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-md transition hover:shadow-lg cursor-pointer">
                    <img
                        src={imagePath}
                        alt={product.name}
                        className=" aspect-square object-contain"
                        onClick={() => window.location.href = `/product/${product.id}`}
                    />
                    <Button className="absolute bg-white text-black rounded-full hover:scale-105 hover:shadow-md hover:bg-gray-100 right-2 bottom-2">
                        <ShoppingCart onClick={() => cart.addItem(product)} className="w-6 h-6" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-start justify-between">
                <h2 className="text-md">{product.name}</h2>
                <div className="font-bold justify-between">Rs. {product.price}</div>
                <div className="text-sm text-gray-600"><ShoppingBag className="inline-block w-4 h-4" /> {product.stores.name}</div>
            </div>
        </div>
    );
}

export default ModelCard;
