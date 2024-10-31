import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getStoreId = async (
    userId: string
) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("stores").select().eq("userId", userId).limit(1).single();

    if (error) {
        console.log(error);
        return null;
    }

    const storeId = data?.id;
    //console.log(typeof(storeId));
    return storeId;
}
 
export default getStoreId;