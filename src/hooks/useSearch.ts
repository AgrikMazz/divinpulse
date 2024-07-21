import { create } from "zustand";

interface Query {
    query: string;
    setQuery: (query: string) => void;
}

const useSearch = create<Query>((set) => ({
    query: "",
    setQuery: (query) => set({ query: query }),
}));

export default useSearch;
