"use client";

import ImageModal from "@/app/components/ImageModal";
import ProductModal from "@/app/components/ProductModal";
import StoreModal from "@/app/components/StoreModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
            <ProductModal />
            <ImageModal />
        </>
    )
};

export default ModalProvider;