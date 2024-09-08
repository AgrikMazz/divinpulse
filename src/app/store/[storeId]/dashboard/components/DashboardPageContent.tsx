"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

const DashboardPageContent = () => {
    const router = useRouter();
    const params = useParams();

    return (
        <div>
            <Button className="m-2 hover:bg-gray-100" variant={"outline"} onClick={() => router.push(`/store/${params.storeId}/complete`)}>
                <CiCirclePlus size={25} className="mr-2" />
                Complete Store
            </Button>
            <Button className="m-2 hover:bg-gray-100" variant={"outline"} onClick={() => router.push(`/store/${params.storeId}/products/create`)}>
                <CiCirclePlus size={25} className="mr-2" />
                Create Product
            </Button>
        </div>
    );
}
 
export default DashboardPageContent;