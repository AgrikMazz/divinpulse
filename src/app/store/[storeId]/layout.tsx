import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import getStoreById from "@/app/actions/getStoreById";
import loadStoreImages from "@/app/actions/loadStoreImages";
import getProductsByStore from "@/app/actions/getProductsByStore";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import DashboardContent from "../components/DashboardContent";

export default async function StoreLayout ({
    children,
    params
}:{
    children: React.ReactNode,
    params: {storeId: string}
}) {
    const store = await getStoreById(Number(params.storeId));
    if (!store) { redirect("/"); }
    const images = loadStoreImages(store);
    const products = await getProductsByStore(Number(params.storeId));

    const { userId } = auth();
    if (!userId) { redirect("/sign-in"); }

    return (
        <>
            <Header />
            <DashboardContent store={store} images={images} products={products} />
            <Navbar storeId={params.storeId} />
            {children}
            <Footer />
        </>
    )
}