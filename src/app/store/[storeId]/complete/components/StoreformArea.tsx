"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { CiCirclePlus } from "react-icons/ci";

const StoreFormArea = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");
    const [markdownFile, setMarkdownFile] = useState<File | null>(null);
    const [markdownFileUrl, setMarkdownFileUrl] = useState<string>("");
    const { userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [fileListUrl, setFileListUrl] = useState<string[]>([]);
    const [fileArray, setFileArray] = useState<File[]>([]);
    const [fileEnter, setFileEnter] = useState(false);
    const params = useParams();
    const supabase = createClientComponentClient();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
            postalCode: null,
            bannerImage: null
        }
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const img = new Image();
            img.src = URL.createObjectURL(selectedFile);
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                if (aspectRatio === 4 / 1) {
                    setFile(selectedFile);
                    setFileUrl(img.src);
                } else {
                    setFile(null);
                    setFileUrl("");
                    toast.error("Image aspect ratio should be 4:1");
                }
            };
        }
    };

    const handleMarkdownFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const MdFileUrl = URL.createObjectURL(selectedFile);
            setMarkdownFile(selectedFile);
            setMarkdownFileUrl(MdFileUrl);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // TODO: transaction
        try {
            setLoading(true);
            const storageId = uniqid();

            for (let i = 0; i < fileArray.length; i++){
                const { data: imageData, error: imageError } = await supabase.storage.from('store-images').upload(fileListUrl[i], fileArray[i], {
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

            if(file) {
                const { data: imageData, error: imageError } = await supabase.storage.from('store-images').upload(fileUrl, file, {
                    cacheControl: '3600',
                    upsert: false
                });
                if (imageError) {
                    console.log(imageError);
                    return;
                }
                console.log(imageData);
            }

            if(markdownFile) {
                const { data: MdData, error: MdError } = await supabase.storage.from('store-abouts').upload(markdownFileUrl, markdownFile, {
                    cacheControl: '3600',
                    upsert: false
                });
                if (MdError) {
                    console.log(MdError);
                    return;
                }
                console.log(MdData);
            }

            const {data: addressData, error: addressError} = await supabase.from('stores').update([{addressLine1: values.addressLine1, addressLine2: values.addressLine2, city: values.city, country: values.country, postalCode: values.postalCode, bannerUrl: fileUrl, storeImageUrls: fileListUrl, storeAbout: markdownFileUrl}]).eq('id', params.storeId);
            if (addressError) {
                console.log(addressError);
                return;
            }
            console.log(addressData);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mt-2 font-semibold">Upload Store Images</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-2 mx-auto">
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
                                            setFileArray((prevFilelist) => [...prevFilelist, file]);
                                            setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                                        }
                                    }
                                });
                            } else {
                                [...e.dataTransfer.files].forEach((file, i) => {
                                    let blobUrl = URL.createObjectURL(file);
                                    setFileArray((prevFilelist) => [...prevFilelist, file]);
                                    setFileListUrl((prevFilelist) => [...prevFilelist, blobUrl]);
                                });
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
                            multiple
                            onChange={(e) => {
                                let files = e.target.files;
                                if (files) {
                                    for (let i = 0; i < files.length; i++) {
                                        if (files[i]) {
                                            let blobUrl = URL.createObjectURL(files[i]);
                                            fileListUrl.push(blobUrl);
                                            setFileArray((prevFilelist) => [...prevFilelist, files[i]]);
                                        }
                                    }
                                }
                            }}
                            />
                        </div>
                    </div>
                    {fileArray.length > 0 &&
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => {
                                    setFileArray([]),
                                    setFileListUrl([])
                                }}
                                className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
                            >
                                Reset
                            </button>
                        </div>
                    }
                <Input type="text" required placeholder="Address line 1" {...register("addressLine1")} />
                <Input type="text" required placeholder="Address line 2" {...register("addressLine2")} />
                <Input type="text" required placeholder="City" {...register("city")} />
                <Input type="text" required placeholder="Country" {...register("country")} />
                <Input type="number" required placeholder="Postal code" {...register("postalCode")} />
                <h1 className="font-semibold">Upload Image</h1>
                <Input type="file" required onChange={handleFileChange} />
                <img src={fileUrl} />
                <h1 className="font-semibold">Upload About Section</h1>
                <Input type="file" required onChange={handleMarkdownFileChange} />
                <button type="submit" className="border border-black mt-4 text-sm font-semibold w-[80%] rounded-full p-2 hover:bg-slate-100 hover:scale-105 transition mb-4">Submit</button>
            </form>
        </div>
    );
}

export default StoreFormArea;
