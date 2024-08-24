"use client";

import getProductsByCategory from "@/app/actions/getProductsByCategory";
import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useFavourite from "@/hooks/useFavourite";
import { Image as ImageData, Product } from "@/types/types";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface FavouritePageClientProps {
    products: Product[];
}

const FavouritePageClient= () => {
    const fav = useFavourite();
    const [loading, setLoading] = useState(false);
    const [similarCategoryProducts, setSimilarCategoryProducts] = useState<Product[] | null>(null);
    useEffect( () => {
        const getSimilarItems = async () => {
            setLoading(true);
            const categories2D = fav.items.map((item) => {
                return item.categories.path.split('/').map((category) => +category);
            });
            const categories1D = [...new Set(categories2D.flat())];
            const ProductsByCat = await getProductsByCategory(categories1D);
            setSimilarCategoryProducts(ProductsByCat);
            setLoading(false);
        }
        getSimilarItems();
    }, [])
    
    return (
        <div className="">
            <div className="m-4">
                <p className="text-2xl font-semibold">Your Favourites</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
                    {fav && !loading && fav.items.map((product: Product) => (
                        <div className="ml-4">
                            <ModelCard key={product.id} product={product} />
                        </div>
                    ))}
                </div>
                {fav.items.length === 0 && !loading && <div className="ml-4">No products found</div>}
                {loading && <div className="ml-4 mt-8"><BeatLoader /></div>}
            </div>
            <div>
                <h1 className="text-xl font-semibold mx-4 mt-4">Similar Items</h1>
                <Carousel>
                    <CarouselContent className="m-4 border">
                        {loading && <div className="ml-4 mt-8"><BeatLoader /></div>}
                        {similarCategoryProducts?.map((product) => (
                            <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <ModelCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0" />
                    <CarouselNext className="absolute right-0" />
                </Carousel>
            </div>
        </div>
    );
}

export default FavouritePageClient;