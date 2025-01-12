import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadProductImage = (product: Product) => {
    const supabase = createClientComponentClient();
    const {data: imageData } = supabase.storage.from("product-images").getPublicUrl(product.imageUrl?.[0]);
    return imageData?.publicUrl;
}

export default loadProductImage;