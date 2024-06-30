import FormArea from "./components/FormArea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CreateProductPage = async () => {
    const supabase = createClientComponentClient();

    const {data: categoryData, error: categoryError} = await supabase.from('categories').select('*');
    if (categoryError) {
        console.log(categoryError);
        return;
    }

    const {data: subCategoryData, error: subCategoryError} = await supabase.from('sub-categories').select('*');
        if (subCategoryError) {
            console.log(subCategoryError);
            return;
        }

    return (
        <div className="m-2">
            <h1 className="text-2xl font-semibold">Create Product</h1>
            <FormArea categories={categoryData} subcategories={subCategoryData} />
        </div>
    );
}
 
export default CreateProductPage;