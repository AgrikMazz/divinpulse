import React from "react";
import getProductsByStore from "@/app/actions/getProductsByStore";
import PageContent from "./components/pageContent";
import DashboardContent from "../../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import { redirect } from "next/navigation";
import loadStoreImages from "@/app/actions/loadStoreImages";
import { Product } from "@/types/types";
import getCategoriesById from "@/app/actions/getCategoriesById";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Footer from "@/app/components/Footer";

interface ProductPageProps {
    params: {
        storeId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const supabase = createClientComponentClient();
    const store = await getStoreById(Number(params.storeId));
    let categoryIds: number[] =[];
    if (!store) { redirect("/"); }
    const images = loadStoreImages(store);
    const products: Product[] | null = await getProductsByStore(Number(params.storeId));

    products?.map( async (product) => {
        categoryIds.push(...product.categories.path.split('/').map((category) => +category));
    })

    //@ts-ignore
    const productIds: number[] = products?.map((product) => product.id)
    const { data: reviewData, error: reviewError } = await supabase.from('products-users-nest').select('*').in('product_id', productIds);
    if (reviewError) {
        console.log(reviewError);
        return null;
    }

    const categories = await getCategoriesById(categoryIds);
    console.log(categories);

    return (
        <div>
            <PageContent products={products} categories={categories} reviews={reviewData} />
        </div>
    )
}

export default ProductPage;
