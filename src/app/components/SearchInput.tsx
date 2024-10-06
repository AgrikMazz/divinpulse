"use client";

import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    const router = useRouter();
    const [inp, setInp] = useState("");
    const qSetter = useSearch((state) => state.setQuery);
    const searchOption = useSearch((state) => state.searchOption);
    const setSearchOption = useSearch((state) => state.setSearchOption);
    
    if (globalThis.window?.location.pathname === "/search/store") {
        setSearchOption('Store');
    } else {
        setSearchOption('Product');
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchOption(event.target.value);
        if (globalThis.window?.location.pathname !== "/search" && event.target.value === 'Product') {
            setSearchOption('Product');
            globalThis.window?.location.replace("/search");            
        } else if (globalThis.window?.location.pathname !== "/search/store" && event.target.value === 'Store') {
            setSearchOption('Store');
            globalThis.window?.location.replace("/search/store");
        }
    };

    const onSearch = (inp: string) => {
        qSetter(inp);
        const query = {
            title: inp
        }
        if (searchOption == 'Store') {
            const url = qs.stringifyUrl({
                url: "/search/store",
                query
            }, { skipNull: true })
            router.push(url);
        } else if (searchOption == 'Product') {
            const url = qs.stringifyUrl({
                url: "/search",
                query
            }, { skipNull: true })
            router.push(url);
        }
    }

    return (
        <div className="flex flex-row items-center w-fit p-2 gap-x-2 rounded-full text-sm bg-zinc-400">
            <input
                className="rounded-full py-2 px-2 font-normal w-full"
                placeholder="Search for anything"
                value={inp}
                onChange={e => setInp(e.target.value)}
                onKeyDown={e => {
                if (e.key === 'Enter') {
                    onSearch(inp);
                }}}
            />
            <div className="flex cursor-pointer bg-white rounded-full hover:bg-gray-100 transition-all">
                <button className="p-2" onClick={() => onSearch(inp)}>
                    <FaSearch className="w-5 h-5 text-gray-500" />
                </button>
            </div>
            <div className="">
                <select value={searchOption} className="rounded-full p-2 cursor-pointer" onChange={handleChange}>
                    {/*<option value="" className="hidden">Search</option>*/}
                    <option value="Product">Product</option>
                    <option value="Store">Store</option>
                </select>
            </div>
        </div>
    );
}
 
export default SearchInput;