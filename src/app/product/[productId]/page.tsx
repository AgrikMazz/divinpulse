import loadProductImages from "@/app/actions/loadProductImages";
import { Product } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import ProductPageClient from "./components/ProductPageClient";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import getProductsByCategory from "@/app/actions/getProductsByCategory";

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
    const categories: number[] = product.categories.path.split('/').map((category) => +category);
    const similarCatProducts = await getProductsByCategory(categories);
    console.log(similarCatProducts)

    const publicUrls = loadProductImages(product);
    console.log(product)

    const imageInfo = {
        id: product?.id,
        imageUrls: publicUrls
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex items-center justify-center mt-4">
                <ProductPageClient product={product} imageInfo={imageInfo} similarCategoryProducts={similarCatProducts} />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
 
export default ProductPage;
