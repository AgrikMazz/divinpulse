import getProductById from "@/app/actions/getProductById";
import RateItem from "@/app/components/RateItem";
import ReviewCard from "@/app/components/ReviewCard";
import StarSection from "@/app/components/StarSection";
import { Review } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
    productId: number
}

const ReviewSection: React.FC<Props> = async ({ productId }) => {
    const supabase = createClientComponentClient();
    const { data: reviewData, error: reviewError } = await supabase.from('products-users-nest').select('*').eq('product_id', productId);

    if (reviewError) {
        console.log(reviewError);
        return null;
    }

    console.log(reviewData);

    const product = await getProductById(productId);

    return (
        <div>
            {product && <StarSection product={product} />}
            {product && <RateItem product={product} />}
            <h1 className="text-xl my-4">Reviews for this item</h1>
            <div className="flex flex-col border rounded-lg p-2 my-4">
                {reviewData?.map((review) => (
                    <div key={review.id} className="flex flex-col mb-2">
                        <ReviewCard review={
                            {
                                id: review.id,
                                product_id: review.product_id,
                                user_id: review.user_id,
                                review: review.review,
                                rating: review.rating,
                                name: review.username
                            } as Review
                        } />
                    </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default ReviewSection;