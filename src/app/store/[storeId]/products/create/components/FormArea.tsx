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
    const [fileListUrl, setFileListUrl] = useState<string[]>([]);
    const [fileList, setFileList] = useState<FileList[]>([]);
    const [fileEnter, setFileEnter] = useState(false);
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

            for (let i = 0; i < fileList.length; i++){
                const { data: imageData, error: imageError } = await supabase.storage.from('product-images').upload(fileListUrl[i], fileList[i]?.[0], {
                    cacheControl: '3600',
                    upsert: false
                });
                if (imageError) {
                    console.log(imageError);
                    return;
                }
            }

            const {data: productData, error: productError} = await supabase.from('products').insert([{ name: values.productname, user_id: userId, description: values.about, imageUrl: fileListUrl, price: values.price, store_id: storeId, category_id: values.category, subcategory_id: values.subcategory }]).select('*')
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
                    <div className="container px-4 max-w-5xl mx-auto">
                        {fileListUrl.map((file) => (
                            <div
                                key={file}
                                className="w-72 h-72 flex flex-row"
                            >
                            <img
                                className="w-72 h-72"
                                src={file}
                                alt="uploaded"
                            />
                            </div>
                        ))}
                        <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setFileEnter(true);
                        }}
                        onDragLeave={(e) => {
                            setFileEnter(false);
                        }}
                        onDragEnd={(e) => {
                            e.preventDefault();
                            setFileEnter(false);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            setFileEnter(false);
                            if (e.dataTransfer.items) {
                            [...e.dataTransfer.items].forEach((item, i) => {
                                if (item.kind === "file") {
                                    const file = item.getAsFile();
                                    if (file) {
                                        let blobUrl = URL.createObjectURL(file);
                                        setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                                    }
                                }
                            });
                            console.log(fileList);
                            } else {
                            [...e.dataTransfer.files].forEach((file, i) => {
                                let blobUrl = URL.createObjectURL(file);
                                setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                            });
                            console.log(fileList);
                            }
                        }}
                        className={`${
                            fileEnter ? "border-4" : "border-2"
                        } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
                        >
                        <label
                            htmlFor="file"
                            className="h-full flex flex-col justify-center text-center"
                        >
                            Click to upload or drag and drop
                        </label>
                        <input
                            id="file"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                console.log(e.target.files);
                                let files = e.target.files;
                                if (files && files[0]) {
                                    let blobUrl = URL.createObjectURL(files[0]);
                                    fileListUrl.push(blobUrl);
                                    setFileList((prevFilelist) => [...prevFilelist, files]);
                                }
                            }}
                        />
                        </div>
                        {fileList.length > 0 && <div className="flex flex-col items-center">
                            <button
                                onClick={() => setFileList([])}
                                className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
                            >
                                Reset
                            </button>
                        </div>}
                    </div>
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
