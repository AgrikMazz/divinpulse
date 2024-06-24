"use client";

import uniqid from "uniqid";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "./ui/input";
import useProductModal from "@/hooks/useProductModal";
import getStoreId from "@/app/actions/getStoreId";

const ProductModal = () => {
    const router = useRouter();
    const { onClose, isOpen } = useProductModal();
    const { userId, sessionId } = useAuth();
    const [loading, setLoading] = useState(false);
    const supabase = createClientComponentClient();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            productname: "",
            price: "",
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
            const productId = uniqid();
            const storeId = await getStoreId(String(userId));
            const { data: imageData, error: imageError } = await supabase.storage.from('product-images').upload(`product-image-${userId}-${values.productname}-${uniqueId}`, values.image?.[0], {
                cacheControl: '3600',
                upsert: false
            });

            if (imageError) {
                console.log(imageError);
                return;
            }

            const {data: productData, error: productError} = await supabase.from('products').insert([{ name: values.productname, user_id: userId, description: values.about, imageUrl: imageData?.path, price: values.price, id: `product-image-${userId}-${values.productname}-${productId}`, store_id: storeId  }]).select('*')
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
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            title="Create a Product"
            description="Make a product listing"
        >
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
                    </div>
                    <Button type="submit" onClick={() => handleSubmit(onSubmit)}>Submit</Button>
                </form>
        </Modal>
    )
}

export default ProductModal;
