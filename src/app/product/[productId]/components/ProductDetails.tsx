"use client";

import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@/types/types";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import ProductCollapsible from "./ProductCollapsibles";
import useImageModal from "@/hooks/useImageModal";
import Link from "next/link";
import { Store } from "lucide-react";

interface ProductDetailsProps {
    product: Product
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const ImageModal = useImageModal();
    return (
        <div className="">
            <div className="text-2xl font-bold text-green-700 my-2">Rs. {product.price}</div>
            <div className="text-gray-700 my-2">{product.name}</div>
            <div className=" text-sm font-semibold mb-3">{product.stores.name}</div>
            <div>
                <div className=" text-sm text-gray-700">options</div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="rounded-md border px-2 py-3 hover:shadow-lg flex items-center justify-between w-full my-1">
                                <div className="text-gray-700 text-sm ">Select an option</div>
                                <IoMdArrowDropdown />
                            </button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mt-6">
                <button className="border border-black text-sm font-semibold w-full rounded-full py-3 hover:bg-slate-100 hover:scale-105 transition">Add to cart</button>
                <button className="border bg-black text-white text-sm font-semibold w-full rounded-full py-3 mt-2 hover:bg-slate-800 hover:scale-105 transition">Buy now</button>
                <button className="flex items-center justify-center text-sm font-semibold w-full rounded-full py-3 mt-2 hover:bg-slate-100 transition">
                    <FaHeart className="text-red-600" />
                    <div className="ml-1">Add to favourites</div>
                </button>
            </div>
            <div>
                <ProductCollapsible title="Description">
                    <div className="text-sm text-gray-700 p-2">{product.description}</div>
                </ProductCollapsible>
                <ProductCollapsible title="Know your seller">
                    <Link className="flex items-center justify-start text-sm text-gray-700 p-2 gap-x-2 hover:underline" href={`/store/${product.stores.id}`}><Store size={16} />{product.stores.name}</Link>
                </ProductCollapsible>
            </div>
        </div>
    );
}

export default ProductDetails;