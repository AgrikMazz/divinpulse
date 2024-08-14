import { Image as ImageData, Product } from "@/types/types";
import Gallery from "./Gallery";
import ProductDetails from "./ProductDetails";

interface ProductPageClientProps {
    product: Product,
    imageInfo: ImageData
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({ product, imageInfo }) => {

    return (
        <div className="flex items-start justify-center max-w-6xl border">
            <div>
                <Gallery imageInfo={imageInfo} />
            </div>
            <div className="hidden md:flex flex-col border p-3 mr-4 mt-4 min-w-60">
                <ProductDetails product={product} />
            </div>
        </div>
    );
}
 
export default ProductPageClient