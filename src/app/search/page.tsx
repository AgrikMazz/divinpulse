"use client";

import Header from "@/components/Header";
import useSearch from "@/hooks/useSearch";
import SearchPageServer from "./components/SearchPageServer";
import { useEffect } from "react";
import { Product } from "@/types/types";
import getProductBySearch from "../actions/getProductsBySearch";
import ModelCard from "@/components/ModelCard";

const SearchPage = () => {
    const q = useSearch((state) => state.query);
    let products: Product[] | null = [];
    
    useEffect(() => {
        const fetchData = async () => {
            products = await getProductBySearch(q);
            console.log(products);
        }
        fetchData();
    }, [q]);

    return (
        <div>
            <Header />
            <div>
                {products ? products.map((product: any) => (
                    <ModelCard key={product.id} product={product} />
                )) : <div className="ml-4">No products found</div>}
            </div>
        </div>
    );
}

export default SearchPage;