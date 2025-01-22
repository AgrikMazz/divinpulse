import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const update_isFavourite = async (userId: string, productId: number, isFavourite: boolean) => {
    console.log(userId, productId, isFavourite);
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products-users-nest").upsert({ user_id: userId, product_id: productId, is_favourite: isFavourite }).select("*");

    if (productError) {
        console.log(productError);
        return null;
    }
    
    //console.log(productData);
    return productData;
}

export const update_isInCart = async (userId: string, productId: number, isInCart: boolean) => {
    const supabase = createClientComponentClient();
    const { data: productData, error: productError } = await supabase.from("products-users-nest").upsert({ user_id: userId, product_id: productId, is_in_cart: isInCart }).select("*");

    if (productError) {
        console.log(productError);
        return null;
    }
    
    //console.log(productData);
    return productData;
}
