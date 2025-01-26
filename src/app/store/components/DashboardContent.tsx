"use client";

import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import { Product, Store } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

interface DashboardContentProps {
    store: Store,
    images: {
        iconImageUrl: string
        bannerImageUrl: string
    },
    products: Product[] | null
}

const DashboardContent: React.FC<DashboardContentProps> = ({
    store,
    images,
    products
}) => {
    const params = useParams();
    const router = useRouter();
    const total_reviews = products ? products.reduce((acc, product) => acc + product.number_of_reviews, 0) : 0;
    const total_sales = products ? products.reduce((acc, product) => acc + product.total_sold, 0) : 0;

    return (
        <div>
            <div>
                {images.bannerImageUrl !== null ?
                    <img className="w-full" src={images.bannerImageUrl} /> :
                    <div></div>
                }
                <div className="flex items-center justify-between mb-10 w-full h-48 bg-slate-50">
                    <div className="flex mt-16">
                        <div className="w-32 h-32 border flex items-center justify-center mx-8 my-2 rounded-lg bg-yellow-50">
                            <img className="rounded-lg" src={images.iconImageUrl} />
                        </div>
                        <div>
                            <h1 className="text-2xl">{store.name}</h1>
                            <p className="text-lg text-gray-800">{store.label}</p>
                            <p className="text-gray-600">{store.city}, {store.country}</p>
                            <div>
                                <div className="text-sm gap-x-2 mt-4">
                                    <p>{total_sales} sales</p>
                                    <p>{total_reviews} reviews</p>
                                </div>
                                <button className="border shadow-xl bg-white mt-6 bottom-0 border-black text-sm font-semibold w-fit rounded-full py-3 px-6 hover:bg-slate-100  transition">Follow Shop</button>
                            </div>
                        </div>
                    </div>
                    {/*<div className="flex gap-x-4 mx-4">
                        <div>Feature 1</div>
                        <div>Feature 2</div>
                        <div>Seller</div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
}
 
export default DashboardContent;
