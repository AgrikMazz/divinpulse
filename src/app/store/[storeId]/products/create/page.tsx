import toast from "react-hot-toast";
import FormArea from "./components/FormArea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CreateProductPage = async () => {
    const supabase = createClientComponentClient();

    const {data: categoryData, error: categoryError} = await supabase.from('categories').select('*');
    if (categoryError) {
        toast.error("Couldn't load categories");
        console.log(categoryError);
        return;
    }

    return (
        <div className="m-5">
            <FormArea categories={categoryData} />
        </div>
    );
}
 
export default CreateProductPage;