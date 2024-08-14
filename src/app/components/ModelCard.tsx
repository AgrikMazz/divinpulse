"use client";

import { Product } from "@/types/types";
import { Button } from "../../components/ui/button";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import loadProductImage from "../actions/loadProductImage";
import useFavourite from "@/hooks/useFavourite";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
    product: Product
}

const ModelCard: React.FC<Props> = ({ product }) => {
    const cart = useCart();
    const fav = useFavourite();
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const favItems = fav.items;
    useEffect(() => {
        favItems.forEach((item) => {
            if (item.id === product.id) {
                setIsFavourite(true);
            }
        })
    }, [favItems, product.id])
    const imagePath = loadProductImage(product);

    const onClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        isFavourite ? fav.removeItem(product.id) : fav.addItem(product)
    }

    return (
        <Link href={`/product/${product.id}`}>
            <div className="bg-white overflow-hidden flex flex-col rounded-lg m-4 p-2 max-w-full transition hover:shadow-lg">
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
                        <Button className="absolute w-fit h-fit bg-white text-black rounded-full hover:scale-105 hover:shadow-md hover:bg-gray-100 right-2 top-2">
                            <Heart onClick={() => onClick} className={cn("w-4 h-4", { "fill-red-500 text-red-500": isFavourite })} />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-between">
                    <h2 className="text-md">{product.name}</h2>
                    <div className="font-bold justify-between">Rs. {product.price}</div>
                    <div className="text-sm text-gray-600"><ShoppingBag className="inline-block w-4 h-4" /> {product.stores.name}</div>
                </div>
            </div>
        </Link>
    );
}

export default ModelCard;
