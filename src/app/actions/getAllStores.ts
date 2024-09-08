import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getAllStores = async () => {
    const supabase = createClientComponentClient();
    const { data: storeData, error: storeError } = await supabase.from("stores").select(`*`);
    if (storeError) {
        console.log(storeError);
        return null;
    }
    console.log(storeData);

    return storeData as Store[];
}
 
export default getAllStores;