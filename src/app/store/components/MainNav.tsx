import { UserButton, useAuth } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";

const MainNav = () => {
    const params = useParams();
    const pathname = usePathname();
    const { isLoaded, userId } = useAuth();
    
    return (
        <div className="h-12 flex items-center justify-between border-b-2">
            <div className="p-4">
                {params.storeId && <p>Navbar for {params.storeId}</p>}
            </div>
            {isLoaded && userId && <UserButton />}
        </div>
    );
}
 
export default MainNav;
