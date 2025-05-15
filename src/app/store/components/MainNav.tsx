"use client";

import { cn } from "@/lib/utils";
import { Store } from "@/types/types";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Tab, TabGroup, TabList } from "@headlessui/react";
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
            href: `/store/${params.storeId}/services`,
            label: "Services",
            active: pathname === `/store/${params.storeId}/services`,
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
        <div className="flex flex-row w-full items-center justify-center">
            <div className="flex items-center justify-between gap-x-4">
                <TabGroup>
                    <TabList>
                        {routes.filter((route) => route.accessibility === "Buyer" || (route.accessibility === "Seller" && userId === store.userId)).map((route, index) => (
                            <Tab
                                key={index}
                                value={route.label}
                                className="mx-2 h-full border-transparent border-b-2 hover:border-black"
                            >
                                <Link key={route.href} href={route.href} onClick={() => window.location.assign(route.href)} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? " text-black dark:text-white" : "text-muted-foreground")}>
                                    {route.label}
                                </Link>
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
            </div>
        </div>
    );
}
