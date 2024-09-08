import { redirect, useParams } from "next/navigation";
import DashboardContent from "../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import loadStoreImage from "@/app/actions/loadStoreImages";
import getProductsByStore from "@/app/actions/getProductsByStore";
import Footer from "@/app/components/Footer";
import AboutContent from "../components/AboutContent";

interface Props {
    params: {
        storeId: string
    }
}

const Store: React.FC<Props> = async ({ params }) => {
    const store = await getStoreById(params.storeId);
    if (!store) { redirect("/"); }
    const images = loadStoreImage(store);
    const products = await getProductsByStore(params.storeId);

    return (
        <div>
            <DashboardContent store={store} images={images} products={products} />
            <AboutContent store={store} />
            <Footer />
        </div>
    );
}

export default Store;
