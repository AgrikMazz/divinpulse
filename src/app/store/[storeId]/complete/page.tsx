import { auth } from "@clerk/nextjs/server";
import StoreFormArea from "./components/StoreformArea";
import getStoreById from "@/app/actions/getStoreById";
import { redirect } from "next/navigation";

interface Props {
    params: {
        storeId: string
    }
}

const CompleteStorePage: React.FC<Props> = async ({ params}) => {
    const { userId } = auth();
    const store = await getStoreById(params.storeId);
    if (userId !== store?.userId) {
        redirect("/");
    }
    return (
        <div className="m-2">
            <h1 className="text-2xl font-semibold">Complete Store</h1>
            <StoreFormArea />
        </div>
    );
}
 
export default CompleteStorePage;