"use client";

import uniqid from "uniqid";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useMerchModal from "../hooks/useStoreModal";
import { useAuth } from "@clerk/nextjs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "./ui/input";

const StoreModal = () => {
    const router = useRouter();
    const { onClose, isOpen } = useMerchModal();
    const { userId, sessionId } = useAuth();
    const [loading, setLoading] = useState(false);
    const supabase = createClientComponentClient();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            storename: "",
            subheading: "",
            about: "",
            image: null,
        }
    })

    useEffect(() => {
        if (sessionId) {
            router.refresh();
            onClose();
        }
    }, [sessionId, router]);

    const onChange = (open: boolean) => {
        if (!open) { 
            onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setLoading(true);
            const uniqueId = uniqid();
            const { data: imageData, error: imageError } = await supabase.storage.from('store-images').upload(`image-${userId}-${values.storename}-${uniqueId}`, values.image?.[0], {
                cacheControl: '3600',
                upsert: false
            });

            if (imageError) {
                console.log(imageError);
                return;
            }

            const {data: storeData, error: storeError} = await supabase.from('stores').insert([{ name: values.storename, userId: userId, label: values.subheading, about: values.about, imageUrl: imageData?.path }]).select('*')

            window.location.assign(`/store/${storeData?.[0].id}`);
            console.log(values);
            console.log(storeData);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title="Create your store"
            description="Become a seller and start selling"
        >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3 mb-4">
                        <div className="">
                            <p className="ml-1 mb-1 font-semibold">Store Name</p>
                            <Input placeholder="Enter your store name" {...register("storename", { required: true })} />
                        </div>
                        <div>
                            <p className="ml-1 mb-1 font-semibold">Store Label</p>
                            <Input placeholder="Enter your store label" {...register("subheading", { required: true })} />
                        </div>
                        <div>
                            <p className="ml-1 mb-1 font-semibold">About</p>
                            <Textarea placeholder="Enter your store description" {...register("about", { required: true })} />
                        </div>
                        <div>
                        <p className="ml-1 mb-1 font-semibold">Store image</p>
                        <Input type="file" {...register("image", { required: true })} />
                        </div>
                    </div>
                    <Button type="submit" onClick={() => handleSubmit(onSubmit)}>Submit</Button>
                </form>
        </Modal>
    )
}

export default StoreModal;
