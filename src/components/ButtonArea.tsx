"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useStoreModal from "@/hooks/useStoreModal";

const ButtonArea = (values: {storeId: string, isSeller: boolean}) => {
    const { isLoaded, userId } = useAuth();
    const StoreModal = useStoreModal();
    const router = useRouter();

    return (
        <div>
            {isLoaded && userId ? (
                <div className="flex justify-end">
                    {values.isSeller == true ? (
                        <Button size={"sm"} variant={"ghost"} className="hover:underline hover:bg-transparent mr-2" onClick={() => router.push(`/store/${values.storeId}`)}>Store</Button>
                    ) : (
                        <Button size={"sm"} variant={"ghost"} className="hover:underline hover:bg-transparent mr-2" onClick={StoreModal.onOpen}>Become a seller</Button>
                    )}
                    <UserButton />
                </div>
            ) : (
                <div className="flex flex-col items-end mr-2">
                    <div>
                        <Button size={"sm"} className=" bg-yellow-300 hover:bg-yellow-400 w-fit transition text-black font-semibold" onClick={() => router.push("/sign-up")}>Register</Button>
                        <Button size={"sm"} variant={"ghost"} className="hover:underline hover:bg-transparent" onClick={() => router.push("/sign-in")}>Login</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ButtonArea;