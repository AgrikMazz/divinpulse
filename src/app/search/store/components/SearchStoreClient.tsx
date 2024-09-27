"use client";

import getProductBySearch from "@/app/actions/getProductsBySearch";
import getStoresBySearch from "@/app/actions/getStoresBySearch";
import loadStoreIcon from "@/app/actions/loadStoreIcon";
import ModelCard from "@/app/components/ModelCard";
import PilgrimageCard from "@/app/components/PilgrimageCard";
import useSearch from "@/hooks/useSearch";
import { Store } from "@/types/types";
import { useEffect, useState } from "react";
import Beatloader from "react-spinners/BeatLoader";

const SearchStoreClient = () => {

    const q = useSearch((state) => state.query);
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    let storeImages: string[] = [];
    
    const fetchData = async () => {
        setLoading(true);
        const ss = await getStoresBySearch(q);
        if (ss) {
            setStores(ss);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
        console.log(stores);
        //@ts-ignore
        {stores && stores.forEach(async (store) => {
            storeImages.push(loadStoreIcon(store));
        })}
    }, [q])

    return (
        <div className="flex items-center justify-center">
            <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {stores && !loading && stores.map((store: Store, index) => (
                    <div key={store.id} className="ml-4">
                        <PilgrimageCard key={store.id} store={store} />
                    </div>
                ))}
            </div>
            {stores.length === 0 && !loading && <div className="ml-4">No products found</div>}
            {loading && <div className="ml-4 mt-8"><Beatloader /></div>}
        </div>
    );
}
 
export default SearchStoreClient;
