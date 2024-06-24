"use client";

import ProductModal from "@/components/ProductModal";
import StoreModal from "@/components/StoreModal";
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
        </>
    )
};

export default ModalProvider;