import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadStoreIcon = (store: Store) => {
    const supabase = createClientComponentClient();
    const {data: iconImageData } = supabase.storage.from("store-images").getPublicUrl(store.iconUrl);
   return iconImageData.publicUrl as string
}

export default loadStoreIcon;