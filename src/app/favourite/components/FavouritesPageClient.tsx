"use client";

import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import useFavourite from "@/hooks/useFavourite";
import { Image as ImageData, Product } from "@/types/types";

interface FavouritePageClientProps {
    products: Product[];
}

const FavouritePageClient = () => {
    const fav = useFavourite();
    
    return (
        <div className="">
            <h1 className="mx-4 text-xl">Cart</h1>
            <div>
                {fav.items.map((item) => (
                    <ModelCard key={item.id} product={item} />
                ))}
            </div>
            <Button className="mx-4">Checkout</Button>
        </div>
    );
}

export default FavouritePageClient;