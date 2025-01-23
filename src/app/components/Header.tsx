import getStoreId from "@/app/actions/getStoreId";
import { auth } from "@clerk/nextjs/server";
import ButtonArea from "./ButtonArea";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CategoryBox from "./CategoryBox";

const Header = async () => {
    const { userId } = auth();
    const storeId = await getStoreId(String(userId));
    let isSeller: boolean;

    if (!storeId) { isSeller = false; }
    else { isSeller = true; }

    return (
        <div className="flex flex-wrap items-center justify-between gap-y-4 p-2 border-b-2">
            <div className="flex items-center mr-2">
                <CategoryBox />
                <Link href="/" className="font-serif font-semibold text-[#565694] cursor-pointer text-3xl">
                    Divinpulse
                </Link>
            </div>
            <div className="w-full md:w-auto md:flex-1 text-3xl font-bold flex justify-center order-2 md:order-1">
                <SearchInput />
            </div>
            <div className="order-1 md:order-2 ml-2">
                <ButtonArea storeId={storeId} isSeller={isSeller} />
            </div>
        </div>
    );
}

export default Header;
