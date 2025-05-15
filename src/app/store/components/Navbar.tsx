import { auth } from "@clerk/nextjs/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Store } from "@/types/types";
import { MainNav } from "@/app/store/components/MainNav";
import { Separator } from "@/components/ui/separator";
import getStoreById from "@/app/actions/getStoreById";

interface NavbarProps {
    storeId: string
}

const Navbar: React.FC<NavbarProps> = async ({ storeId }) => {
    const { userId } = auth();
    const supabase = createClientComponentClient();

    if(!userId) {
        redirect("/sign-in");
    }

    const { data: storeData, error: storeError } = await supabase.from("stores").select().eq("userId", userId);
    const activeStore = await getStoreById(Number(storeId));

    return (
        <div>
            <div className="flex items-center">
                {activeStore && <MainNav store={activeStore} />}
            </div>
            <Separator />
        </div>
    );
}
 
export default Navbar