"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { TbWorld } from "react-icons/tb";

export function MainNav ({
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            href: `/store/${params.storeId}`,
            label: "Dashboard",
            active: pathname === `/store/${params.storeId}`
        },
        {
            href: `/store/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/store/${params.storeId}/products`
        }
    ]

    const { isLoaded, userId } = useAuth();

    return (
        <div className="flex flex-row w-full items-center justify-between">
            <div className="flex items-center justify-between gap-x-2">
                {routes.map((route) => (
                    <Link key={route.href} href={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? " text-black dark:text-white" : "text-muted-foreground")}>
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
