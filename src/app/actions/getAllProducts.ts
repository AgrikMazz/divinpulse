import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getAllProducts = async () => {
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products").select(`*, stores(id, name)`);

    if (productError) {
        console.log(productError);
        return null;
    }
    
    console.log(productData);
    return productData;
}
 
export default getAllProducts;