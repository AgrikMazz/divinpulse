import toast from "react-hot-toast";
import FormArea from "./components/FormArea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import getStoreById from "@/app/actions/getStoreById";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CreateProductProps {
    params: {
        storeId: string
    }
}

const CreateProductPage: React.FC<CreateProductProps> = async ({ params}) => {
    const { userId } = auth();
    const supabase = createClientComponentClient();

    const {data: categoryData, error: categoryError} = await supabase.from('categories').select('*');
    if (categoryError) {
        toast.error("Couldn't load categories");
        console.log(categoryError);
        return;
    }
    const store = await getStoreById(params.storeId);
    if (userId !== store?.userId) {
        redirect("/");
    }

    return (
        <div className="m-5">
            <FormArea categories={categoryData} />
        </div>
    );
}
 
export default CreateProductPage;