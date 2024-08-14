"use client";

import { categories } from "@/app/components/CategoryBox";
import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

interface PageContentProps {
    products: Product[] | null
}

const PageContent: React.FC<PageContentProps>= ({ products }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            <Button className="m-2 hover:bg-gray-100" variant={"outline"} onClick={() => router.push(`/store/${params.storeId}/products/create`)}><CiCirclePlus size={25} className="mr-2" /> Create Product</Button>
            <div className="flex items-center justify-center">
                <div className="hidden md:block w-36 border border-r">
                    {categories.map((category, index) => (
                        <div key={index} className="p-2">
                            <p className="text-center">{category.category}</p>
                        </div>
                    ))}
                </div>
                <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {products ? products.map((product: any) => (
                    <ModelCard key={product.id} product={product} />
                )): <div className="ml-4">No products found</div>}
                </div>
            </div>
        </div>
    );
}
 
export default PageContent;