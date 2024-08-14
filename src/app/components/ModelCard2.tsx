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

const ModelCard2: React.FC<Props> = ({ product }) => {
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
        <div className="flex max-h-48 border rounded-lg m-4 p-2 hover:shadow-lg">
            <Link href={`/product/${product.id}`} className="bg-white overflow-hidden h-full w-full aspect-square flex flex-col rounded-lg p-2 transition hover:shadow-lg hover:border">
                <div className="aspect-square bg-gray-100 rounded-md transition cursor-pointer">
                    <img
                        src={imagePath}
                        alt={product.name}
                        className="aspect-square object-contain"
                        onClick={() => window.location.href = `/product/${product.id}`}
                    />
                </div>
            </Link>
            <div className="flex flex-col items-start justify-between">
                <h2 className="text-md">{product.name}</h2>
                <div className="font-bold justify-between">Rs. {product.price}</div>
                <div className="text-sm text-gray-600"><ShoppingBag className="inline-block w-4 h-4" /> {product.stores.name}</div>
            </div>
        </div>
    );
}

export default ModelCard2;
