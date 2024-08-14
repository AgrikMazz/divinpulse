import getProductBySearch from "@/app/actions/getProductsBySearch";
import ModelCard from "@/app/components/ModelCard";
import { Product } from "@/types/types";

interface SearchPageServerProps {
    query: string;
}

const SearchPageServer: React.FC<SearchPageServerProps> = async ({ query }) => {
    
    const products: Product[] | null = await getProductBySearch(query);

    return (
        <div>
            {products ? products.map((product: any) => (
                <ModelCard key={product.id} product={product} />
            )) : <div className="ml-4">No products found</div>}
        </div>
    );
}

export default SearchPageServer;
