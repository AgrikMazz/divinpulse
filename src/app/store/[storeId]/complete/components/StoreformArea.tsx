"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const StoreFormArea = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");
    
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

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        
        // TODO: transaction
        try {
            setLoading(true);
            const storageId = uniqid();

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

            const {data: addressData, error: addressError} = await supabase.from('stores').update([{addressLine1: values.addressLine1, addressLine2: values.addressLine2, city: values.city, country: values.country, postalCode: values.postalCode, bannerUrl: fileUrl}]).eq('id', params.storeId);
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
                <Input type="text" required placeholder="Address line 1" {...register("addressLine1")} />
                <Input type="text" required placeholder="Address line 2" {...register("addressLine2")} />
                <Input type="text" required placeholder="City" {...register("city")} />
                <Input type="text" required placeholder="Country" {...register("country")} />
                <Input type="number" required placeholder="Postal code" {...register("postalCode")} />
                <Input type="file" required onChange={handleFileChange} />
                <img src={fileUrl} />
                <button className="mb-4 py-2 px-4 rounded-md hover:bg-gray-200 transition w-fit flex items-center justify-center" type="submit">Submit</button>
            </form>
        </div>
    );
}
 
export default StoreFormArea;