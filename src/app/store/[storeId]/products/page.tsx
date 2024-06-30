import React from "react";
import getProducts from "@/app/actions/getProductsByStore";
import PageContent from "./components/pageContent";
import { Product } from "@/types/types";
import ModelCard from "@/components/ModelCard";

interface ProductPageProps {
    params: {
        storeId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    let products: Product[] = [];

    await getProducts(String(params.storeId)).then((res) => {
        if (res) {
            for (let i = 0; i < res.length; i++) {
                products.push(res[i]);
            }
        }
    });

    console.log(products);

    return (
        <div>
            <PageContent products={products} />
        </div>
    )
}

export default ProductPage;
