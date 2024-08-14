import React from "react";
import getProductsByStore from "@/app/actions/getProductsByStore";
import PageContent from "./components/pageContent";
import DashboardContent from "../../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import { redirect } from "next/navigation";
import loadStoreImages from "@/app/actions/loadStoreImages";

interface ProductPageProps {
    params: {
        storeId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const store = await getStoreById(params.storeId);
    if (!store) { redirect("/"); }
    const images = loadStoreImages(store);
    const products = await getProductsByStore(String(params.storeId));
    console.log(products);

    return (
        <div>
            <DashboardContent store={store} images={images} />
            <PageContent products={products} />
        </div>
    )
}

export default ProductPage;
