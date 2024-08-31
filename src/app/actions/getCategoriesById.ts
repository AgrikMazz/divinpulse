import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getCategoriesById = async (categoryIds: number[]) => {
    const supabase = createClientComponentClient();

    const { data: CategoryData, error: CategoryError } = await supabase.from("categories").select("name").in("id", categoryIds);
    if (CategoryError) {
        console.log(CategoryError);
        return null;
    }
    const categories: string[] = CategoryData.map((category) => category.name);
    return categories;
}
 
export default getCategoriesById;