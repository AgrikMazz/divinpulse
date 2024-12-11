import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getStoreById = async (id: number) => {
    const supabase = createClientComponentClient();
    const { data: storeData, error: storeError } = await supabase.from("stores").select().eq("id", id).single();

    if (storeError) {
        console.log(storeError);
        return null;
    }

    //console.log(storeData);

    return storeData as Store;
}
 
export default getStoreById;