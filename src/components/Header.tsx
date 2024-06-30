import { TbWorld } from "react-icons/tb";
import getStoreId from "@/app/actions/getStoreId";
import ButtonArea from "./ButtonArea";
import { auth } from "@clerk/nextjs/server";

const Header = async () => {
    const { userId } = auth();
    const storeId = await getStoreId(String(userId));
    let isSeller: boolean;

    if (!storeId) { isSeller = false; }
    else { isSeller = true; }

    return (
        <div className="grid grid-cols-3 p-2 bg-gray-300">
            <div>
                <TbWorld size={40} className="ml-4 hover:cursor-pointer hover:scale-105 transition" />
            </div>
            <div className="flex justify-center text-3xl font-bold">
                DivinPulse
            </div>
            <ButtonArea storeId={String(storeId)} isSeller={isSeller} />
        </div>
    );
}

export default Header;
