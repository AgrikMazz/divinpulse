"use client";

import { Product } from "@/types/types";
import StarRating from "./StarRating";

interface Props {
    product: Product
}

const StarSection: React.FC<Props> = ({product}) => {
    const trueRating = product.rating/10;
    return (
        <div className="my-4">
            <div className="flex gap-x-2 items-center">
                <h1 className="text-lg font-semibold">{product.number_of_ratings} Ratings</h1>
                <StarRating rating={trueRating} readOnly={true} isHalf={true} />
                <p>{trueRating}</p>
            </div>
            <h1 className="text-lg font-semibold">{product.number_of_reviews} Reviews</h1>
        </div>
    );
}
 
export default StarSection;