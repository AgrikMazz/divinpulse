import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SearchStoreClient from "./components/SearchStoreClient";

const SearchPage = () => {
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
            </div>
            <div className="mt-auto">
                <SearchStoreClient />
                <Footer />
            </div>
        </div>
    );
}

export default SearchPage;
