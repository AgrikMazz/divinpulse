import { auth } from "@clerk/nextjs/server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Store } from "@/types/types";
import StoreSwitcher from "../app/store/components/StoreSwitcher";
import { MainNav } from "@/app/store/components/MainNav";
import { Separator } from "./ui/separator";

const Navbar = async () => {
    const { userId } = auth();
    const supabase = createClientComponentClient();

    if(!userId) {
        redirect("/sign-in");
    }

    const stores = await supabase.from("stores").select().eq("userId", userId);

    const formattedStores = stores.data?.map((store: Store) => {
        return {
            id: store.id,
            name: store.name
        }
    })

    return (
        <div>
            <div className="flex items-center">
                <div className="m-2">{formattedStores && <StoreSwitcher stores={formattedStores} />}</div>
                <MainNav />
            </div>
            <Separator />
        </div>
    );
}
 
export default Navbar