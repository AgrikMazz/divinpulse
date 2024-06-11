import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getStoreId = async (
    userId: string
) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("stores").select().eq("userId", userId).single();
    const storeId = data?.id;
    return storeId;
}
 
export default getStoreId;