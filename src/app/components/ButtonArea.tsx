"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import useStoreModal from "@/hooks/useStoreModal";
import { Heart, ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import useFavourite from "@/hooks/useFavourite";
import StoreSwitcher from "./StoreSwitcher";
import { Store } from "@/types/types";

interface ButtonAreaProps {
    allStores: Store[] | null,
    allUserStores: Store[] | null
}

const ButtonArea: React.FC<ButtonAreaProps> = ({
    allStores,
    allUserStores
}) => {
    const { isLoaded, userId } = useAuth();
    const StoreModal = useStoreModal();
    const router = useRouter();
    const cart = useCart();
    const fav = useFavourite();

    return (
        <div className="flex">
            {isLoaded && userId ? (
                <div className="flex justify-end">
                    <UserButton />
                    <Button variant={"ghost"} className="hover:bg-gray-100" size={"sm"} onClick={() => router.push(`/cart`)}>
                        <ShoppingCart className="w-5 h-5 ml-1" />
                        <span className="ml-1">{cart.items.length}</span>
                    </Button>
                    <Button variant={"ghost"} className="hover:bg-gray-100" size={"sm"} onClick={() => router.push(`/favourite`)}>
                        <Heart className="w-5 h-5" />
                        <span className="ml-1">{fav.items.length}</span>
                    </Button>
                    <StoreSwitcher allStores={allStores} allUserStores={allUserStores} />
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
