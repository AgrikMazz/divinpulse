"use client";

import { Review } from "@/types/types";
import StarRating from "./StarRating";

interface ReviewCardProps {
    review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="border-b-2 border-gray-400 p-2">
            <StarRating rating={review.rating} readOnly={true} />
            <p className="mb-1">{review.review}</p>
            <p className="text-gray-600 text-sm">by {review.name}</p>
        </div>
    );
}
 
export default ReviewCard;