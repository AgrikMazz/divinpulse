import { create } from "zustand";

interface Query {
    query: string;
    setQuery: (query: string) => void;
    searchOption: string;
    setSearchOption: (searchProduct: string) => void;
}

const useSearch = create<Query>((set) => ({
    query: "",
    setQuery: (query) => set({ query: query }),
    searchOption: "",
    setSearchOption: (searchOption) => set({ searchOption: searchOption }),
}));

export default useSearch;
