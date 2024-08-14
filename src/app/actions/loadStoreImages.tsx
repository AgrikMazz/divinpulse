import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadStoreImages = (store: Store) => {
    const supabase = createClientComponentClient();
    const {data: bannerImageData } = supabase.storage.from("store-images").getPublicUrl(store.bannerUrl);
    const {data: iconImageData } = supabase.storage.from("store-images").getPublicUrl(store.iconUrl);
    return {
        bannerImageUrl: bannerImageData.publicUrl,
        iconImageUrl: iconImageData.publicUrl
    };
}

export default loadStoreImages;