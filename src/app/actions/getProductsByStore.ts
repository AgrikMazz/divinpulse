import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getProductsByStore = async (storeId: number) => {
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products").select(`*, stores(id, name), categories(id, path)`).eq("store_id", storeId);
    if (productError) {
        console.log(productError);
        return null;
    }
    return productData as Product[];
}

export default getProductsByStore;
