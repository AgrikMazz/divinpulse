import { Image as ImageData, Product } from "@/types/types";
import Gallery from "./Gallery";

interface ProductPageClientProps {
    product: Product,
    imageInfo: ImageData
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({ product, imageInfo }) => {
    return (
        <div>
            <div>
                <Gallery imageInfo={imageInfo} />
            </div>
            <p>Product Name: {product.name}</p>
            <p>Product Description: {product.description}</p>
            <p>Product Price: {product.price}</p>
        </div>
    );
}
 
export default ProductPageClient