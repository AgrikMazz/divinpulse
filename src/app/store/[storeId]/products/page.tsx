import React from "react";
import getProductsByStore from "@/app/actions/getProductsByStore";
import PageContent from "./components/pageContent";
import DashboardContent from "../../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import { redirect } from "next/navigation";
import loadStoreImages from "@/app/actions/loadStoreImages";
import { Product } from "@/types/types";
import getCategoriesById from "@/app/actions/getCategoriesById";

interface ProductPageProps {
    params: {
        storeId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const store = await getStoreById(params.storeId);
    let categoryIds: number[] =[];
    if (!store) { redirect("/"); }
    const images = loadStoreImages(store);
    const products: Product[] | null = await getProductsByStore(String(params.storeId));
    products?.map((product) => {
        categoryIds.push(...product.categories.path.split('/').map((category) => +category));
    })
    const categories = await getCategoriesById(categoryIds);
    console.log(categories);

    return (
        <div>
            <DashboardContent store={store} images={images} products={products} />
            <PageContent products={products} categories={categories} />
        </div>
    )
}

export default ProductPage;
