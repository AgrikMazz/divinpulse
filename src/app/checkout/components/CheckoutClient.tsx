"use client";

import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";

const CheckoutClient = () => {
    const cart = useCart();
    const amount = cart.items.reduce((acc, item) => acc + item.price, 0);

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
                
                const paymentResult = await result.json();
                if (paymentResult.isOk) {
                    await fetch('/api/generate-invoice', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ paymentResult }),
                    });
                } else {
                    alert(paymentResult.message);
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
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <h1 className="mx-4 text-xl">Cart</h1>
            <div className="">
                {cart.items.map((item) => (
                    <div className="max-w-72"><ModelCard key={item.id} product={item} /></div>
                ))}
            </div>
            <Button onClick={processPayment} className="m-4">Checkout</Button>
        </div>
    );
}
 
export default CheckoutClient;