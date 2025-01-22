"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import useStoreModal from "@/hooks/useStoreModal";
import { Heart, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import useFavourite from "@/hooks/useFavourite";
import CategoryBox from "./CategoryBox";

const ButtonArea = (values: {storeId: string, isSeller: boolean}) => {
    const { isLoaded, userId } = useAuth();
    const StoreModal = useStoreModal();
    const router = useRouter();
    const cart = useCart();
    const fav = useFavourite();

    return (
        <div className="flex">
            <CategoryBox />
            {isLoaded && userId ? (
                <div className="flex justify-end">
                    <Button variant={"ghost"} className="hover:bg-gray-100 mr-2" size={"sm"} onClick={() => router.push(`/cart`)}>
                        <ShoppingCart className="w-6 h-6" />
                        <span className="ml-2">{cart.items.length}</span>
                    </Button>
                    <Button variant={"ghost"} className="hover:bg-gray-100 mr-2" size={"sm"} onClick={() => router.push(`/favourite`)}>
                        <Heart className="w-6 h-6" />
                        <span className="ml-2">{fav.items.length}</span>
                    </Button>
                    {values.isSeller == true ? (
                        <Button size={"sm"} variant={"ghost"} className="hover:underline hover:bg-transparent mr-2" onClick={() => router.push(`/store/${values.storeId}`)}>Store</Button>
                    ) : (
                        <Button size={"sm"} variant={"ghost"} className="hover:underline hover:bg-transparent mr-2" onClick={() => router.push("/store/create")}>Become a seller</Button>
                    )}
                    <UserButton />
                </div>
            ) : (
                <div className="flex flex-col items-end mr-2">
                    <div>
                        <Button size={"sm"} className="bg-[#565694] hover:bg-violet-900 w-fit transition text-white rounded-full font-semibold" onClick={() => router.push("/sign-in")}>Sign in</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ButtonArea;