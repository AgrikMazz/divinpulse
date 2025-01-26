import { Image as ImageData, Product, Store } from "@/types/types";
import Gallery from "./Gallery";
import ProductDetails from "./ProductDetails";
import ReviewSection from "./ReviewSection";
import SimilarItems from "./SimilarItems";

interface ProductPageClientProps {
    product: Product,
    store: Store,
    imageInfo: ImageData,
    similarCategoryProducts: Product[] | null,
    sameStoreProdcts: Product[] | null
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({ product, store, imageInfo, similarCategoryProducts, sameStoreProdcts }) => {

    return (
        <div className="p-4 w-full">
            <div className="flex items-start justify-center max-w-7xl">
                <div className=" gap-x-4">
                    <Gallery imageInfo={imageInfo} />
                    <div className="hidden md:flex flex-col rounded-md p-3 mr-4 mt-4 w-full">
                        <ProductDetails product={product} store={store} />
                    </div>
                    <ReviewSection productId={product.id} />
                </div>
                <div className="hidden md:flex flex-col rounded-md p-3 mx-4 min-w-80 max-w-96">
                    <ProductDetails product={product} store={store} />
                </div>
            </div>
            <div className="">
                <SimilarItems similarCategoryProducts={similarCategoryProducts} sameStoreProducts={sameStoreProdcts} />
            </div>
        </div>
    );
}

export default ProductPageClient;
