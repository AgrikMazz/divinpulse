import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getAllUserStores = async (
    userId: string
) => {
    const supabase = createClientComponentClient();
    const { data: storeData, error: storeError } = await supabase.from("stores").select().eq("userId", userId)

    if (storeError) {
        console.log(storeError);
        return null;
    }

    return storeData as Store[];
}
 
export default getAllUserStores;