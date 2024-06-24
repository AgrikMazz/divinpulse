import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getAllProducts = async () => {
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products").select("*");

    if (productError) {
        console.log(productError);
        return null;
    }
    
    return productData;
}
 
export default getAllProducts;