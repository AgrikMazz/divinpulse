"use client";

import ModelCard from "@/app/components/ModelCard";
import ReviewCard from "@/app/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Product, Review } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

interface PageContentProps {
    products: Product[] | null,
    categories: string[] | null,
    reviews: Review[] | null
}

const PageContent: React.FC<PageContentProps>= ({ products, categories, reviews }) => {
    const params = useParams();
    const router = useRouter();
    const total_sales = products ? products.reduce((acc, product) => acc + product.total_sold, 0) : 0;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="max-w-7xl">
                <div className="flex items-start w-full">
                    <div className="hidden md:block min-w-48 border-r">
                        <div className="flex flex-col mx-4">
                            {categories?.map((category, index) => (
                                <div key={index} className="p-2 hover:bg-gray-100 transition cursor-default">
                                    <p className="text-center">{category}</p>
                                </div>
                            ))}
                            <button className="border border-black mt-4 text-sm font-semibold w-full rounded-full p-2 hover:bg-slate-100 hover:scale-105 transition">Contact Owner</button>
                            <div className="text-sm opacity-75 mt-4 ml-2 pb-2">{total_sales} sales</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {products ? products.map((product: any) => (
                            <ModelCard key={product.id} product={product} />
                        )): <div className="ml-4">No products found</div>}
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="p-4">
                    <h1 className="text-xl mb-4 font-serif">Shop Item Reviews</h1>
                    {reviews?.map((review: Review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default PageContent;