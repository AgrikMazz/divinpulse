import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Image as ImageData, Product } from "@/types/types";
import FavouritePageClient from "./components/FavouritesPageClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface FavouritePageProps {
    params: {
        productId: string
    }
}

const FavouritePage: React.FC<FavouritePageProps> = async ({ params }) => {
    return(
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
                <FavouritePageClient />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}
 
export default FavouritePage;