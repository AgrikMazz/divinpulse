import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchPageClient from "./components/SearchPageClient";

const SearchPage = () => {
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
                <SearchPageClient />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default SearchPage;
