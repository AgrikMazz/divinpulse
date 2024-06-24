import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getProductsByStore = async (storeId: string) => {
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products").select("*").eq("store_id", storeId);
    if (productError) {
        console.log(productError);
        return null;
    }
    return productData;
}

export default getProductsByStore;
