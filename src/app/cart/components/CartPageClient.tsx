"use client";

import ModelCard2 from "@/app/components/ModelCard2";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";

const CardPageClient=()=>{
    const router = useRouter();
    const cart = useCart();

    const proceedToCheckout = () => {
        //sessionStorage.setItem("fromCart", "true");
        window.location.href = "/checkout";
    };

    return (
        <div className="m-4">
            <div className="flex flex-col">
            <div className="m-4">
                <p className="text-2xl font-semibold">Your Cart</p>
            </div>
                {cart.items && cart.items.map((product) => (
                    <div key={product.product.id} className="ml-4 flex flex-col justify-between items-center">
                        <ModelCard2 key={product.product.id} item={product} />
                    </div>
                ))}
            </div>
            <Button onClick={() => proceedToCheckout()} className="m-4">Proceed to checkout</Button>
        </div>
    );
}
 
export default CardPageClient;