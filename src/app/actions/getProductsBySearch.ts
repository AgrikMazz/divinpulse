import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getProductBySearch = async (query: string) => {
    const supabase = createClientComponentClient();
    
    const { data: productData, error: productError } = await supabase.from("products").select("*, stores(id, name)").ilike("name", `%${query}%`).ilike("description", `%${query}%`).ilike("stores.name", `%${query}%`);
    
    if(productError) {
        console.log(productError);
        return null;
    }
    
    console.log(productData);
    return productData as Product[];
}
 
export default getProductBySearch;