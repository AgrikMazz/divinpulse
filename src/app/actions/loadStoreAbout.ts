import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadStoreAbout = async (store: Store) => {
    const supabase = createClientComponentClient();
    const { data: mdData, error: MdError } = await supabase.storage.from("store-abouts").download(store.storeAbout);
    if (MdError) {
        console.log(MdError);
        return null;
    }
    return mdData;
}

export default loadStoreAbout;