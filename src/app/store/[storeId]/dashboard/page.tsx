import Footer from "@/app/components/Footer";
import DashboardContent from "../../components/DashboardContent";
import getStoreById from "@/app/actions/getStoreById";
import loadStoreImages from "@/app/actions/loadStoreImages";
import getProductsByStore from "@/app/actions/getProductsByStore";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import DashboardPageContent from "./components/DashboardPageContent";

interface ProductPageProps {
    params: {
        storeId: string
    }
}

const StoreDashboard: React.FC<ProductPageProps> = async ({ params }) => {
    const { userId } = auth();
    const store = await getStoreById(Number(params.storeId));
    if (!store) { redirect("/"); }
    const images = loadStoreImages(store);
    const products = await getProductsByStore(Number(params.storeId));
    if(store.userId !== userId) { redirect("/"); }

    return (
        <div>
            <DashboardPageContent />
        </div>
    );
}
 
export default StoreDashboard;