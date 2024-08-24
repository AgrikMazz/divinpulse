"use client";

import ModelCard from "@/app/components/ModelCard";
import ModelCard2 from "@/app/components/ModelCard2";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/types";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const CartPageClient = () => {
    const cart = useCart();
    const amount = cart.items.reduce((acc, item) => acc + item.price, 0);
    const [loading, setLoading] = useState(false);

    const createOrderId = async () => {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100,
                }),
            });
      
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log(data);
            return data.orderId;

        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const processPayment = async () => {
        try {
            const orderId: string = await createOrderId();
         
            const options = {
                key: process.env.key_id,
                amount: amount * 100,
                currency: 'INR',
                order_id: orderId,
                handler: async function (response: any) {
                const data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
      
                const result = await fetch('/api/verify', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                const res = await result.json();
                if (res.isOk) alert("payment succeed");
                else {
                    alert(res.message);
                }
                },
                theme: {
                    color: '#3399cc',
                },
            };
            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
                alert(response.error.description);
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="m-4">
                <p className="text-2xl font-semibold">Your Cart</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
                    {cart && !loading && cart.items.map((product: Product) => (
                        <div className="ml-4">
                            <ModelCard key={product.id} product={product} />
                        </div>
                    ))}
                </div>
                {cart.items.length === 0 && !loading && <div className="ml-4">No products found</div>}
                {loading && <div className="ml-4 mt-8"><BeatLoader /></div>}
            </div>
            <Button onClick={processPayment} className="m-4">Checkout</Button>
        </div>
    );
}
 
export default CartPageClient;