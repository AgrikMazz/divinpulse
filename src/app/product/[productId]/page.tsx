import loadImages from "@/app/actions/loadImages";
import ModelCard from "@/components/ModelCard";
import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import ProductPageClient from "./components/ProductPageClient";

interface ProductPageProps {
    params : {
        productId: number
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const supabase = createClientComponentClient();

    const { data: productData, error: productError } = await supabase.from('products').select('*').eq('id', params.productId);
    if (productError) {
        console.log(productError);
        return null;
    }
    const product: Product = productData[0];

    const publicUrls = loadImages(product);

    const imageInfo = {
        id: product?.id,
        imageUrls: publicUrls
    }

    return (
        <div>
            <ProductPageClient product={product} imageInfo={imageInfo} />
        </div>
    );
}
 
export default ProductPage;
