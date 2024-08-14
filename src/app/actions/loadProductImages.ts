import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadProductImages = (product: Product) => {
    const supabase = createClientComponentClient();
    console.log(product);
    let publicUrls: string[] = [];
    {product && product.imageUrl.map((url) => {
        const {data: imageData } = supabase.storage.from("product-images").getPublicUrl(url);
        publicUrls.push(imageData.publicUrl);
    })}
    return publicUrls;
}

export default loadProductImages;