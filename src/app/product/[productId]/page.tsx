import loadProductImages from "@/app/actions/loadProductImages";
import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import ProductPageClient from "./components/ProductPageClient";
import Header from "@/app/components/Header";

interface ProductPageProps {
    params : {
        productId: number
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const supabase = createClientComponentClient();

    const { data: productData, error: productError } = await supabase.from('products').select('*, stores(id, name)').eq('id', params.productId);
    if (productError) {
        console.log(productError);
        return null;
    }
    
    const product: Product = productData[0];
    const publicUrls = loadProductImages(product);
    console.log(product)

    const imageInfo = {
        id: product?.id,
        imageUrls: publicUrls
    }

    return (
        <div>
            <Header />
            <div className="flex items-center justify-center mt-4">
                <ProductPageClient product={product} imageInfo={imageInfo} />
            </div>
        </div>
    );
}
 
export default ProductPage;
