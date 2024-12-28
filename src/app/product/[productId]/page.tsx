import loadProductImages from "@/app/actions/loadProductImages";
import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import ProductPageClient from "./components/ProductPageClient";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getProductsByCategory from "@/app/actions/getProductsByCategory";
import getStoreById from "@/app/actions/getStoreById";
import getProductsByStore from "@/app/actions/getProductsByStore";

interface ProductPageProps {
    params : {
        productId: number
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const supabase = createClientComponentClient();

    const { data: productData, error: productError } = await supabase.from('products').select('*, stores(id, name), categories(id, path)').eq('id', params.productId);
    if (productError) {
        console.log(productError);
        return null;
    }
    const product: Product = productData[0];

    const store = await getStoreById(product.store_id);

    const categories: number[] = product.categories.path.split('/').map((category) => +category);
    const similarCatProducts = await getProductsByCategory(categories);
    const sameStoreProdcuts = await getProductsByStore(product.store_id);

    const publicUrls = loadProductImages(product);

    const imageInfo = {
        id: product?.id,
        imageUrls: publicUrls
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex items-center justify-center m-4 w-full border overflow-hidden">
                {store && <ProductPageClient product={product} imageInfo={imageInfo} similarCategoryProducts={similarCatProducts} sameStoreProdcts={sameStoreProdcuts} store={store} />}
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
 
export default ProductPage;
