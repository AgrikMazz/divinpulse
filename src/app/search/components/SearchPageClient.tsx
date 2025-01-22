"use client";

import getProductBySearch from "@/app/actions/getProductsBySearch";
import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import useSearch from "@/hooks/useSearch";
import { Product } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Beatloader from "react-spinners/BeatLoader";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { FaEllipsisH } from "react-icons/fa";

const SearchPageClient = () => {
    const q = useSearch((state) => state.query);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    let entries: Product[];
    let numberOfPages: number;

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const page = searchParams.get('page') ?? '1';
    const pageSize = '8';

    const start = (Number(page) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    entries = products.slice(start, end);
    numberOfPages = Math.ceil(products.length / Number(pageSize));

    const onClick = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        router.push(`${pathname}?${params.toString()}`);
    }

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
        <div className="flex flex-col mb-4 items-center justify-center">
            <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {entries && !loading && entries.map((product: Product) => (
                    <div key={product.id} className="ml-4">
                        <ModelCard key={product.id} product={product} />
                    </div>
                ))}
            </div>
            <div className="flex gap-x-2">
                <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => { if(Number(page)>1) onClick(Number(page) - 1) }}><MdChevronLeft />Previous</button>
                {/*numberOfPages > 6 ? <div>
                    <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => onClick(Number(page))}>{page}</button>
                    <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => onClick(Number(page)+1)}>{Number(page)+1}</button>
                    <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => onClick(Number(page)+2)}>{Number(page)+2}</button>
                    <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => onClick(Number(page)+3)}>{Number(page)+3}</button>
                    <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black"><FaEllipsisH /></button>
                    <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => onClick(Number(pageSize))}>{Number(pageSize)}</button>
                </div> : <div></div>*/}
                <button className="flex items-center p-2 rounded-md bg-transparent hover:bg-gray-100 text-black" onClick={() => { if(Number(page)<numberOfPages) onClick(Number(page) + 1) }}>Next<MdChevronRight /></button>
            </div>
            {products.length === 0 && !loading && <div className="ml-4">No products found</div>}
            {loading && <div className="ml-4 mt-8"><Beatloader /></div>}
        </div>
    );
}
 
export default SearchPageClient;
