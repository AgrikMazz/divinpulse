"use client";

import ModelCard from "@/components/ModelCard";
import { Button } from "@/components/ui/button";
import useProductModal from "@/hooks/useProductModal";
import { Product } from "@/types/types";
import { redirect, useParams, useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

interface PageContentProps {
    products: Product[]
}

const PageContent: React.FC<PageContentProps>= ({ products }) => {
    const ProductModal = useProductModal();
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            <Button className="m-2 hover:bg-gray-100" variant={"outline"} onClick={() => router.push(`/store/${params.storeId}/products/create`)}><CiCirclePlus size={25} className="mr-2" /> Create Product</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products ? products.map((product: any) => (
                <ModelCard key={product.id} product={product} />
            )): <div className="ml-4">No products found</div>}
            </div>
        </div>
    );
}
 
export default PageContent;