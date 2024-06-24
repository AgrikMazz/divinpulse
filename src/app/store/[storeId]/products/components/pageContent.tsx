"use client";

import Navbar from "@/app/store/components/Navbar";
import { Button } from "@/components/ui/button";
import useProductModal from "@/hooks/useProductModal";

const PageContent = () => {
    const ProductModal = useProductModal();

    return (
        <div>
            <Navbar />
            <h1>Products</h1>
            <Button onClick={ProductModal.onOpen}>Create Product</Button>
        </div>
    );
}
 
export default PageContent;