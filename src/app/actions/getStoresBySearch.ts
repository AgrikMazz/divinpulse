import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import getAllProducts from "./getAllProducts";
import { Store } from "@/types/types";
import getAllStores from "./getAllStores";

const getStoresBySearch = async (query: string) => {
    const supabase = createClientComponentClient();

    const { data: storeData, error: storeError } = await supabase.from("stores").select(`*`).or(`or(name.ilike.%${query}%, label.ilike.%${query}%, about.ilike.%${query}%)`);

    if(storeError) {
        console.log(storeError);
        return null;
    }
    //console.log(storeData);

    if (storeData.length === 0) {
        const allStoresData = getAllStores();
        return allStoresData;
    } else {
        return storeData as Store[];
    }
}
 
export default getStoresBySearch;