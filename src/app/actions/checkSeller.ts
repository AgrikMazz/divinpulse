import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const checkSeller = async (userId: string) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("stores").select().eq("userId", userId).single();

    if (data) {
        return true;
    }

    return false;
}
 
export default checkSeller;