import { redirect, useParams } from "next/navigation";
import DashboardContent from "../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import loadStoreImage from "@/app/actions/loadStoreImages";
import getProductsByStore from "@/app/actions/getProductsByStore";

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
            <DashboardContent store={store} images={images} />
        </div>
    );
}

export default Store;
