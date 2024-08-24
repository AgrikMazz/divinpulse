import { Image as ImageData, Product } from "@/types/types";
import Gallery from "./Gallery";
import ProductDetails from "./ProductDetails";
import ReviewSection from "./ReviewSection";
import SimilarItems from "./SimilarItems";

interface ProductPageClientProps {
    product: Product,
    imageInfo: ImageData,
    similarCategoryProducts: Product[] | null,
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({ product, imageInfo, similarCategoryProducts }) => {

    return (
        <div className="p-4">
            <div className="flex items-start justify-center max-w-7xl">
                <div className=" gap-x-4">
                    <Gallery imageInfo={imageInfo} />
                    <div className="md:hidden flex flex-col border rounded-md p-3 mr-4 mt-4 w-full">
                        <ProductDetails product={product} />
                    </div>
                    <ReviewSection productId={product.id} />
                </div>
                <div className="hidden md:flex flex-col border rounded-md p-3 mx-4 min-w-80 max-w-96">
                    <ProductDetails product={product} />
                </div>
            </div>
            <div className="">
                <SimilarItems similarCategoryProducts={similarCategoryProducts} />
            </div>
        </div>
    );
}

export default ProductPageClient;
