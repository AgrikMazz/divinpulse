import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadImage = (product: Product) => {
    const supabase = createClientComponentClient();
    console.log(product);
    const {data: imageData } = supabase.storage.from("product-images").getPublicUrl(product.imageUrl[0]);
    return imageData.publicUrl;
}

export default loadImage;