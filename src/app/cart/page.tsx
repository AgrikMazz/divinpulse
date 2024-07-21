import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import CartPageClient from "./components/CartPageClient";
import { Image as ImageData } from "@/types/types";
import loadImages from "../actions/loadImages";

interface CartPageProps {
    params: {
        productId: string
    }
}

const CartPage: React.FC<CartPageProps> = async ({ params }) => {
    const supabase = createClientComponentClient();
    const { data: imageData, error: imageError } = await supabase.from("products").select("*").eq("id", params.productId);
    if (imageError) {
        console.log(imageError);
        return null;
    }

    const image: ImageData = {
        id: imageData?.[0].id,
        imageUrls: imageData?.[0].imageUrls
    };

    return(
        <div>
            <CartPageClient image={image} />
        </div>
    )
}
 
export default CartPage;