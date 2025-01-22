"use client";

import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    const router = useRouter();
    const [inp, setInp] = useState("");
    const q = useSearch((state) => state.query);
    const qSetter = useSearch((state) => state.setQuery);

    const onSearch = (inp: string) => {
        qSetter(inp);
        const query = {
            title: inp
        }
        const url = qs.stringifyUrl({
            url: "/search",
            query
        }, { skipNull: true })

        router.push(url);
    }

    return (
        <div className="flex flex-row z-20 items-center w-fit p-2 rounded-full text-sm bg-[#565694]">
            <input
                className="rounded-full mr-2 py-2 px-2 font-normal w-full"
                placeholder="Search for anything"
                value={inp}
                onChange={e => setInp(e.target.value)}
                onKeyDown={e => {
                if (e.key === 'Enter') {
                    onSearch(inp);
                }}}
            />
            <div className="flex w-8 h-8 z-10 items-center justify-center cursor-pointer bg-white rounded-full hover:bg-gray-100 transition-all">
                <button onClick={() => onSearch(inp)}>
                    <FaSearch className="w-5 h-5 p-[2px]" />
                </button>
            </div>
        </div>
    );
}
 
export default SearchInput;