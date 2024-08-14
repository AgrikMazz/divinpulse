import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Image as ImageData, Product } from "@/types/types";
import FavouritePageClient from "./components/FavouritesPageClient";

interface FavouritePageProps {
    params: {
        productId: string
    }
}

const FavouritePage: React.FC<FavouritePageProps> = async ({ params }) => {
    return(
        <div>
            <FavouritePageClient />
        </div>
    )
}
 
export default FavouritePage;