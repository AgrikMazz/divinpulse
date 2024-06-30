"use client";

import uniqid from "uniqid";
import { useAuth } from "@clerk/nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category, SubCategory } from "@/types/types";

interface CreateProductProps {
    categories: Category[],
    subcategories: SubCategory[]
}

const FormArea: React.FC<CreateProductProps> = ({ categories, subcategories }) => {
    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [formattedSubCats, setFormattedSubCats] = useState<SubCategory[]>([]);
    const supabase = createClientComponentClient();
    const params = useParams();
    const storeId = params.storeId;

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            productname: "",
            price: "",
            about: "",
            image: null,
            category: "",
            subcategory: ""
        }
    })

    const onSelectCategory = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        console.log(event.target.value);
        setFormattedSubCats(subcategories.filter((subcategory: SubCategory) => subcategory.parent_cat_id === Number(event.target.value)));
        console.log(formattedSubCats);
    }

    const onSelectSubCategory = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setLoading(true);
            const storageId = uniqid();
            const productId = uniqid();

            const { data: imageData, error: imageError } = await supabase.storage.from('product-images').upload(`product-image-${userId}-${values.productname}-${storageId}`, values.image?.[0], {
                cacheControl: '3600',
                upsert: false
            });
            if (imageError) {
                console.log(imageError);
                return;
            }

            const {data: productData, error: productError} = await supabase.from('products').insert([{ name: values.productname, user_id: userId, description: values.about, imageUrl: imageData?.path, price: values.price, id: `product-image-${userId}-${values.productname}-${productId}`, store_id: storeId, category_id: values.category, subcategory_id: values.subcategory }]).select('*')
            console.log(productData);
            if (productError) {
                console.log(productError);
                return;
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3 mb-4">
                        <div className="">
                            <p className="ml-1 mb-1 font-semibold">Product Name</p>
                            <Input placeholder="Enter product name" {...register("productname", { required: true })} />
                        </div>
                        <div>
                            <p className="ml-1 mb-1 font-semibold">Price</p>
                            <Input type="number" placeholder="Enter product price" {...register("price", { required: true })} />
                        </div>
                        <div>
                            <p className="ml-1 mb-1 font-semibold">About</p>
                            <Textarea placeholder="Enter product description" {...register("about", { required: true })} />
                        </div>
                        <div>
                            <p className="ml-1 mb-1 font-semibold">Product image</p>
                            <Input type="file" {...register("image", { required: true })} />
                        </div>
                        <div>
                             <p className="ml-1 mb-1 font-semibold">Category</p>
                            <select className="w-full border border-slate-200 rounded-md p-2" {...register("category", { required: true })} onChange={onSelectCategory} >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p className="ml-1 mb-1 font-semibold">Sub-category</p>
                            <select className="w-full border border-slate-200 rounded-md p-2" {...register("subcategory", { required: true })} onChange={onSelectSubCategory}>
                                {formattedSubCats.map((fsubcat) => (
                                    <option key={fsubcat.id} value={fsubcat.id}>{fsubcat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Button type="submit" onClick={() => handleSubmit(onSubmit)}>Submit</Button>
            </form>
        </div>
    );
}

export default FormArea;