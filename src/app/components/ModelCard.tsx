"use client";

import { Product } from "@/types/types";
import { Button } from "../../components/ui/button";
import { Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import FadeLoader from "react-spinners/FadeLoader";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import loadProductImage from "../actions/loadProductImage";
import useFavourite from "@/hooks/useFavourite";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { rateLimiter } from "@/lib/rateLimiter";
import toast from "react-hot-toast";
import { update_isFavourite } from "../actions/uprActions";

interface Props {
    product: Product
}

const ModelCard: React.FC<Props> = ({ product }) => {
    const { userId } = useAuth();
    const cart = useCart();
    const fav = useFavourite();
    const isFavourite = fav.checkItem(product.id);
    const isInCart = cart.checkItem(product.id);
    const favItems = fav.items;
    const imagePath = loadProductImage(product);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClickFav = () => {
        if (userId) {
            if(rateLimiter(product.id.toString()+"fav")) {
                    setIsLoading(true);
                    if (isFavourite) {
                        fav.removeItem(product.id);
                    } else {
                        fav.addItem(product);
                    }
                setIsLoading(false);
            } else {
                toast.error("Rate limit exceeded.");
            }
        }
    }

    const onClickCart = () => {
        if (userId) {
            if(rateLimiter(product.id.toString()+"cart")) {
                    setIsLoading(true);
                    if (isInCart) {
                        cart.removeItem(product.id);
                    } else {
                        cart.addItem({product: product, quantity: 1});
                    }
                setIsLoading(false);
            } else {
                toast.error("Rate limit exceeded.");
            }
        }
    }

    return (
        
            <div className="overflow-hidden flex flex-col rounded-lg m-4 p-2 max-w-full transition hover:shadow-lg">
                <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-md transition hover:shadow-lg cursor-pointer">
                        <Link href={`/product/${product.id}`}>
                            <img
                                src={imagePath}
                                alt={product.name}
                                className="rounded-md aspect-square object-contain"
                                onClick={() => window.location.href = `/product/${product.id}`}
                            />
                        </Link>
                        <Button className="absolute bg-white text-black rounded-full hover:scale-105 hover:shadow-md hover:bg-gray-100 right-2 bottom-2">
                            {isLoading ? <FadeLoader className="w-4 h-4" /> : <ShoppingCart onClick={onClickCart} className={cn("w-5 h-5", {"fill-black": isInCart})} />}
                        </Button>
                        <Button className="absolute w-fit h-fit bg-white text-black rounded-full hover:scale-105 hover:shadow-md hover:bg-gray-100 right-2 top-2">
                            {isLoading ? <FadeLoader className="w-4 h-4" /> : <Heart onClick={onClickFav} className={cn("w-4 h-4", { "fill-red-500 text-red-500": isFavourite })} />}
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-between mt-1">
                    <h2 className="text-md font-serif">{product.name}</h2>
                    <div className="font-bold justify-between">Rs. {product.price}</div>
                    <div className="text-sm text-gray-600"><ShoppingBag className="inline-block w-4 h-4" /> {product?.stores?.name}</div>
                </div>
            </div>
    );
}

export default ModelCard;
