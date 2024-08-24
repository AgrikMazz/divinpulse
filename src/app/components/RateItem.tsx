"use client";

import { Product } from "@/types/types";
import StarRating from "./StarRating";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
    product: Product,
}

const RateItem: React.FC<Props> = ({product}) => {
    const { userId } = useAuth();
    const [review, setReview] = useState<string>("");
    const newNumberOfRatings = product.number_of_ratings + 1;
    const supabase = createClientComponentClient();
    const onSubmit = async () => {
        const { data: ReviewData1, error: ReviewError1 } = await supabase.from("products-users-nest").update({ review: review }).eq("user_id", userId).eq("product_id", product.id);
        if (ReviewError1) {
            console.log(ReviewError1);
        }
    }
    return (
        <div className="my-4">
            <p className=" font-semibold">Rate Item</p>
            <StarRating rating={0} onRate={ async (rate) => {
                const newRating = Math.ceil(((product.rating * product.number_of_ratings) + rate * 10)/newNumberOfRatings);
                const { data: RatingData1, error: ReviewError1 } = await supabase.from("products-users-nest").update({ rating: rate }).eq("user_id", userId).eq("product_id", product.id);
                if (ReviewError1) {
                    console.log(ReviewError1);
                }
                const { data: RatingData2, error: RatingError2 } = await supabase.from("products").update({ rating: newRating, number_of_ratings: newNumberOfRatings }).eq("id", product.id);
                if (RatingError2) {
                    console.log(RatingError2);
                }
                console.log(rate);
            }} />
            <Textarea className="rounded-md p-2 border mb-2" name="Review" placeholder="Write a review" onChange={(e) => setReview(e.target.value)} />
            <Button onClick={onSubmit}>Submit Review</Button>
        </div>
    );
}

export default RateItem;