"use client";

import { cn } from "@/lib/utils";
import { Store } from "@/types/types";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { TbWorld } from "react-icons/tb";

interface MainNavProps {
    store: Store
}

export const MainNav: React.FC<MainNavProps> = ({ store }) => {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            href: `/store/${params.storeId}`,
            label: "Home",
            active: pathname === `/store/${params.storeId}`,
            accessibility: "Buyer"
        },
        {
            href: `/store/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/store/${params.storeId}/products`,
            accessibility: "Buyer"
        },
        {
            href: `/store/${params.storeId}/dashboard`,
            label: "Dashboard",
            active: pathname === `/store/${params.storeId}/dashboard`,
            accessibility: "Seller"
        }
    ]

    const { isLoaded, userId } = useAuth();

    return (
        <div className="flex flex-row w-full items-center justify-between">
            <div className="flex items-center justify-between ml-2 gap-x-4">
                {routes.filter((route) => route.accessibility === "Buyer" || (route.accessibility === "Seller" && userId === store.userId)).map((route) => (
                    <Link key={route.href} href={route.href} onClick={() => window.location.assign(route.href)} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? " text-black dark:text-white" : "text-muted-foreground")}>
                        {route.label}
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-x-2 mr-4">
                <button onClick={() => router.push("/")} className="hover:underline hover:opacity-70 rounded-full"><TbWorld size={28} /></button>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}
