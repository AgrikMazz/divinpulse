import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getProductsByCategory = async (categoryIds: number[]) => {
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products").select(`*, stores(id, name, shipyaariPickup)`).in("category_id", categoryIds);
    if (productError) {
        console.log(productError);
        return null;
    }
    return productData as Product[];
}

export default getProductsByCategory;
