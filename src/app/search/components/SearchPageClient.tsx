"use client";

import getProductBySearch from "@/app/actions/getProductsBySearch";
import ModelCard from "@/app/components/ModelCard";
import useSearch from "@/hooks/useSearch";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import Beatloader from "react-spinners/BeatLoader";

const SearchPageClient = () => {

    const q = useSearch((state) => state.query);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        setLoading(true);
        const ps = await getProductBySearch(q);
        if (ps) {
            setProducts(ps);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
        console.log(products);
    }, [q])

    return (
        <div className="flex items-center justify-center">
            <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products && !loading && products.map((product: Product) => (
                    <div key={product.id} className="ml-4">
                        <ModelCard key={product.id} product={product} />
                    </div>
                ))}
            </div>
            {products.length === 0 && !loading && <div className="ml-4">No products found</div>}
            {loading && <div className="ml-4 mt-8"><Beatloader /></div>}
        </div>
    );
}
 
export default SearchPageClient;