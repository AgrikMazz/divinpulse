"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { TbWorld } from "react-icons/tb";
import useStoreModal from "@/hooks/useStoreModal";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import checkSeller from "@/app/actions/checkSeller";
import getStoreId from "@/app/actions/getStoreId";

const Header = () => {
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const { isLoaded, userId } = useAuth();
    const StoreModal = useStoreModal();
    const router = useRouter();
    const storePr = getStoreId(String(userId));
    let storeId: string;
    Promise.resolve(storePr).then((res) => {storeId = res});

    useEffect(() => {
        checkSeller(String(userId)).then((res) => setIsSeller(res));
    }, [userId]);

    return (
        <div className="grid grid-cols-3 p-2 bg-gray-300">
            <div>
                <TbWorld size={40} className="ml-4 hover:cursor-pointer hover:scale-105 transition" onClick={() => router.push("/discover")} />
            </div>
            <div className="flex justify-center text-3xl font-bold">
                DivinPulse
            </div>
            {isLoaded && userId ? (
                <div className="flex justify-end">
                    {isSeller == true ? (
                        <Button size={"sm"} variant={"ghost"} className="hover:underline hover:bg-transparent mr-2" onClick={() => router.push(`/store/${storeId}`)}>Store</Button>
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

export default Header;
