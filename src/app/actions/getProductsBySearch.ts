import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import getAllProducts from "./getAllProducts";

const getProductBySearch = async (query: string) => {
    const supabase = createClientComponentClient();
    
    const { data: productData, error: productError } = await supabase.from("products").select(`*, stores(id, name)`).or(`or(name.ilike.%${query}%, description.ilike.%${query}%)`);

    if(productError) {
        console.log(productError);
        return null;
    }

    if (productData.length === 0) {
        const allProductsData = getAllProducts();
        console.log(allProductsData);
        return allProductsData;
    } else {
        return productData;
    }
}
 
export default getProductBySearch;