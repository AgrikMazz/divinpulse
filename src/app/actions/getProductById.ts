import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getProductById = async (id: number) => {
    const supabase = createClientComponentClient();
    
    const { data: productData, error: productError } = await supabase.from("products").select("*").eq("id", id);
    if(productError) {
        console.log(productError);
        return null;
    }

    return productData[0] as Product;
}
 
export default getProductById;