import { TbWorld } from "react-icons/tb";
import getStoreId from "@/app/actions/getStoreId";
import { auth } from "@clerk/nextjs/server";
import CategoryBox from "./CategoryBox";
import ButtonArea from "./ButtonArea";
import SearchInput from "./SearchInput";
import Link from "next/link";

const Header = async () => {
    const { userId } = auth();
    const storeId = await getStoreId(String(userId));
    let isSeller: boolean;

    if (!storeId) { isSeller = false; }
    else { isSeller = true; }

    return (
        <div className="flex flex-row items-center justify-between gap-x-2 p-2 border-b-2">
            <Link href="/" className="font-serif font-semibold text-[#565694] cursor-pointer text-3xl">Divinpulse</Link>
            <div className="flex justify-center text-3xl font-bold">
                <SearchInput />
            </div>
            <div>
                <ButtonArea storeId={storeId} isSeller={isSeller} />
            </div>
        </div>
    );
}

export default Header;
