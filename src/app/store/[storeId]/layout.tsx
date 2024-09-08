import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

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
            <Navbar storeId={params.storeId} />
            {children}
        </>
    )
}