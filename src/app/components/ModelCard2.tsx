"use client";

import { Quantity } from "@/types/types";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import loadProductImage from "../actions/loadProductImage";
import ItemQuantityBox from "./ItemQuantity";
import useCart from "@/hooks/useCart";

interface MC2Props {
    item: Quantity;
}

const ModelCard2: React.FC<MC2Props> = ({ item }) => {
    const { product, quantity } = item;
    const image = loadProductImage(product);
    const cart = useCart();

    return (
        <div className="flex items-center justify-between w-full max-w-6xl p-4 gap-x-4 bg-white shadow rounded-lg border border-gray-200 mb-4">
            <div className="flex items-center gap-4">
                <div className="aspect-square w-20 h-20 bg-gray-100 rounded-md transition hover:shadow-lg cursor-pointer">
                    <Link href={`/product/${product.id}`}>
                        <img
                            src={image}
                            alt={product.name}
                            className="rounded-md aspect-square object-contain"
                            onClick={() => window.location.href = `/product/${product.id}`}
                        />
                    </Link>
                </div>
                <div className="flex flex-col max-w-96">
                    <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                    <div className="flex items-center gap-x-1 -mt-1">
                        <ShoppingBag className="inline-block w-4 h-4" />
                        <Link href={`/store/${product.stores.id}`}><div className="text-md text-gray-700">{product.stores.name}</div></Link>
                    </div>
                    <div className="text-sm text-gray-500 max-h-16 overflow-y-hidden mt-1"><p>{product.description}</p></div>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
                    <ItemQuantityBox item={item} />
                </div>
                <div className="text-gray-800 font-semibold w-20">Rs. {product.price}</div>
                <div className="cursor-pointer hover:text-red-600 hover:bg-gray-200 hover:scale-105 p-3 rounded-full transition">
                    <Trash2 onClick={() => cart.removeItem(product.id)} />
                </div>
            </div>
        </div>
    );
  };
  
  export default ModelCard2;
  