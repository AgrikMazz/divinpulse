"use client";

import ModelCard from "@/app/components/ModelCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Product } from "@/types/types";

interface Props {
    similarCategoryProducts: Product[] | null,
    sameStoreProducts: Product[] | null
}

const SimilarItems: React.FC<Props> = ({ similarCategoryProducts, sameStoreProducts }) => {
    return (
        <div>
            <div>
                <h1 className="text-xl font-semibold mx-4 mt-4">Similar Items</h1>
                <Carousel>
                    <CarouselContent className="m-4 border">
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
            <div>
                <h1 className="text-xl font-semibold mx-4 mt-4">More items from this store</h1>
                <Carousel>
                    <CarouselContent className="m-4 border">
                        {sameStoreProducts?.map((product) => (
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
 
export default SimilarItems;