"use client";

import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
    const router = useRouter();
    const q = useSearch((state) => state.query);
    const qSetter = useSearch((state) => state.setQuery);

    const onSearch = () => {
        const query = {
            title: q
        }
        const url = qs.stringifyUrl({
            url: "/search",
            query
        }, { skipNull: true })

        router.push(url);
    }

    return (
        <div className="flex flex-row z-20 items-center w-fit p-2 rounded-full text-sm bg-zinc-400">
            <input
                className="rounded-full mr-2 py-2 px-2 font-normal w-full"
                placeholder="Search for anything"
                value={q}
                onChange={e => qSetter(e.target.value)}
                onKeyDown={e => {
                if (e.key === 'Enter') {
                    onSearch();
                }}}
            />
            <div className="flex w-8 h-8 z-10 items-center justify-center cursor-pointer bg-white rounded-full hover:bg-gray-100 transition-all">
                <button onClick={onSearch}>
                    <FaSearch className="w-5 h-5 p-[2px]" />
                </button>
            </div>
        </div>
    );
}
 
export default SearchInput;