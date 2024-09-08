import { Store } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadStoreImages = (store: Store) => {
    const supabase = createClientComponentClient();
    const {data: bannerImageData } = supabase.storage.from("store-images").getPublicUrl(store.bannerUrl);
    const {data: iconImageData } = supabase.storage.from("store-images").getPublicUrl(store.iconUrl);
    let storePublicUrls: string[] = [];
    {store.storeImageUrls && store.storeImageUrls.map((url) => {
        const {data: storeImageData } = supabase.storage.from("store-images").getPublicUrl(url);
        storePublicUrls.push(storeImageData.publicUrl);
    })}

    return {
        bannerImageUrl: bannerImageData.publicUrl as string,
        iconImageUrl: iconImageData.publicUrl as string,
        storePublicUrls
    };
}

export default loadStoreImages;