import { TbWorld } from "react-icons/tb";
import getStoreId from "@/app/actions/getStoreId";
import ButtonArea from "./ButtonArea";
import { auth } from "@clerk/nextjs/server";
import SearchInput from "./SearchInput";
import CategoryBox from "./CategoryBox";

const Header = async () => {
    const { userId } = auth();
    const storeId = await getStoreId(String(userId));
    let isSeller: boolean;

    if (!storeId) { isSeller = false; }
    else { isSeller = true; }

    return (
        <div className="flex flex-row items-center justify-center gap-x-2 p-2 border-b-2 bg-white">
            <div>
                <TbWorld size={40} className="hover:cursor-pointer hover:scale-105 transition" />
            </div>
            <div>
                <CategoryBox />
            </div>
            <div className="flex justify-center text-3xl font-bold">
                <SearchInput />
            </div>
            <ButtonArea storeId={String(storeId)} isSeller={isSeller} />
        </div>
    );
}

export default Header;
