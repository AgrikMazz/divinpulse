import Navbar from "@/app/components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function StoreLayout ({
    children,
    params
}:{
    children: React.ReactNode,
    params: {storeId: string}
}) {
    const { userId } = auth();
    if (!userId) { redirect("/sign-in"); }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}