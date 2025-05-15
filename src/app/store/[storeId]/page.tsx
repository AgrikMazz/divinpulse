import { redirect, useParams } from "next/navigation";
import DashboardContent from "../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import loadStoreImage from "@/app/actions/loadStoreImages";
import getProductsByStore from "@/app/actions/getProductsByStore";
import Footer from "@/app/components/Footer";
import AboutContent from "../components/AboutContent";
import Header from "@/app/components/Header";
import Navbar from "../components/Navbar";

interface Props {
    params: {
        storeId: string
    }
}

const Store: React.FC<Props> = async ({ params }) => {
    const store = await getStoreById(Number(params.storeId));
    if (!store) { redirect("/"); }
    const images = loadStoreImage(store);
    const products = await getProductsByStore(Number(params.storeId));

    return (
        <div>
            <AboutContent store={store} />
        </div>
    );
}

export default Store;
