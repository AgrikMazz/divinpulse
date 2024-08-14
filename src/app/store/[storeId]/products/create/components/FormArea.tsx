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
import { Category } from "@/types/types";
import { CiCirclePlus } from "react-icons/ci";
import toast from "react-hot-toast";


interface CreateProductProps {
    categories: Category[],
}

const FormArea: React.FC<CreateProductProps> = ({ categories }) => {
    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [fileListUrl, setFileListUrl] = useState<string[]>([]);
    const [fileList, setFileList] = useState<FileList[]>([]);
    const [fileEnter, setFileEnter] = useState(false);
    const supabase = createClientComponentClient();
    const params = useParams();
    const router = useRouter();
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
            category: ""
        }
    })

    const onSelectCategory = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
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
                    toast.error("Image upload failed")
                    console.log(imageError);
                    return;
                }

                console.log(imageData);
            }

            const {data: productData, error: productError} = await supabase.from('products').insert([{ name: values.productname, user_id: userId, description: values.about, imageUrl: fileListUrl, price: values.price, store_id: storeId, category_id: values.category }]).select('*')
            
            if (productError) {
                toast.error("Product upload failed")
                console.log(productError);
                return;
            }

            console.log(productData);
            toast.success("Product created")

        } catch (error) {
            console.log(error)
            toast.error("Product creation failed")
        } finally {
            setLoading(false);
            router.push(`/store/${storeId}/products`);
        }
    }
    // TODO: Drag event
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 mx-auto">
                        {fileListUrl.map((file) => (
                            <div
                                key={file}
                                className="aspect-square flex flex-row rounded-md cursor-pointer hover:shadow-md transition bg-gray-50"
                            >
                            <img
                                className="rounded-md object-contain"
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
                            console.log(fileList.length);
                            } else {
                            [...e.dataTransfer.files].forEach((file, i) => {
                                let blobUrl = URL.createObjectURL(file);
                                setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                            });
                            console.log(fileList.length);
                            }
                        }}
                        className={`${
                            fileEnter ? "border-4" : "border-2"
                        } mx-auto aspect-square rounded-lg bg-white flex flex-col border-dashed items-center justify-center`}
                        >
                        <label
                            htmlFor="file"
                            className="h-full relative flex flex-col justify-center text-center p-2"
                        >
                            <p className="">Click to upload or drag and drop</p>
                            <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-3/4 text-gray-500 opacity-20" />
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
                            onDrop={(e) => {
                                e.preventDefault();
                                console.log(e.dataTransfer.files[0]);
                                setFileList((prevFilelist) => [...prevFilelist, e.dataTransfer.files]);
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
                                    console.log(fileList.length);
                                    } else {
                                    [...e.dataTransfer.files].forEach((file, i) => {
                                        let blobUrl = URL.createObjectURL(file);
                                        setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                                    });
                                    console.log(fileList.length);
                                }}}
                            onDragOver={(e) => {
                                e.preventDefault();
                                console.log(e.dataTransfer.files[0]);
                                setFileList((prevFilelist) => [...prevFilelist, e.dataTransfer.files]);
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
                                    console.log(fileList.length);
                                    } else {
                                    [...e.dataTransfer.files].forEach((file, i) => {
                                        let blobUrl = URL.createObjectURL(file);
                                        setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                                    });
                                    console.log(fileList.length);
                                }}}
                            />
                        </div>
                    </div>
                        {fileList.length > 0 && <div className="flex flex-col items-center">
                            <button
                                onClick={() => {
                                    setFileList([]),
                                    setFileListUrl([])
                                }}
                                className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
                            >
                                Reset
                            </button>
                        </div>}
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
                    </div>
                    <Button type="submit" onClick={() => handleSubmit(onSubmit)} className="mb-4">Submit</Button>
            </form>
        </div>
    );
}

export default FormArea;
