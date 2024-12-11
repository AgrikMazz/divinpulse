"use client";

import getStoreById from "@/app/actions/getStoreById";
import { addShiprocketAwb, addShiprocketData, addShipRocketInvoice, addShipRocketOrder, addShiprocketPickup } from "@/app/actions/orders";
import { createOrderSR, generateAwbSR, generateInvoicesSR, generatePickupSR } from "@/app/actions/processShiprocket";
import ItemQuantityBox from "@/app/components/ItemQuantity";
import ModelCard from "@/app/components/ModelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/useCart";
import { Product, Quantity, Store } from "@/types/types";
import Script from "next/script";
import Razorpay from "razorpay";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";

interface OrderItem {
    name: string;
    sku: string;
    units: number;
    selling_price: number;
    discount: number;
    tax: number;
}

interface Packaging {
    length: number;
    breadth: number;
    height: number;
    weight: number;
}

interface CheckoutPageClientProps {
    first_name: string | null;
    last_name: string | null;
    email: string;
    phone: string;
    userId: string;
}

const razorpay = new Razorpay({
    key_id: "rzp_test_cDoY1b6OR9weVU",
    key_secret: "WruHGYoGp6NeQzZsoJK4vAtU",
});

const CheckoutPageClient: React.FC<CheckoutPageClientProps> = ({
    first_name,
    last_name,
    email,
    phone,
    userId
}) => {
    const cart = useCart();
    const totAmount = cart.items.reduce((acc, item) => acc + item.product.price, 0);
    const itemsMap = cart.items.reduce((acc, item) => {
        acc[item.product.id] = (acc[item.product.id] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });
    const itQty: Quantity[] = cart.items.map((item) => {return item});

    const storeIds = new Set(cart.items.map((item) => item.product.store_id));
    const date = new Date();
    const [itemsQty, setItemsQty] = useState<Quantity[]>(itQty);
    const [storeArray, setStoreArray] = useState<Store[]>([]);
    const [storeDetails, setStoreDetails] = useState<Record<string, { totalPrice: number; razorpayId: string | null; storeId: number }>>({});
    const [storeTotalsArray, setStoreTotalsArray] = useState<{ totalPrice: number; razorpayId: string | null; storeId: number }[]>([]);
    const [loading, setLoading] = useState(false);

    const [bFirstName, setBFirstName] = useState(first_name || "");
    const [bLastName, setBLastName] = useState(last_name || "");
    const [bEmail, setBEmail] = useState(email);
    const [bPhone, setBPhone] = useState(phone);
    const [bAdl1, setBAdl1] = useState("");
    const [bAdl2, setBAdl2] = useState("");
    const [bCity, setBCity] = useState("");
    const [bState, setBState] = useState("");
    const [bCountry, setBCountry] = useState("");
    const [bPincode, setBPincode] = useState("");

    const [shippingIsBilling, setShippingIsBilling] = useState(true);

    const [shippingFirstName, setShippingFirstName] = useState(first_name || "");
    const [shippingLastName, setShippingLastName] = useState(last_name || "");
    const [shippingEmail, setShippingEmail] = useState(email);
    const [shippingPhone, setShippingPhone] = useState(phone);
    const [shippingAdl1, setShippingAdl1] = useState("");    
    const [shippingAdl2, setShippingAdl2] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingState, setShippingState] = useState("");
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingPincode, setShippingPincode] = useState("");

    const [packaging, setPackaging] = useState<Packaging>({
        length: 0,
        breadth: 0,
        height: 0,
        weight: 0
    });

    /*const updateQuantity = (itemId: number, delta: number) => {
        setItemsQty((prevItems) =>
          prevItems.map((item) =>
            item.product.id === itemId
              ? {...item, number: Math.max(1, item.quantity + delta) }
              : item
          )
        );
    };*/

    function calculateOptimalPackaging(items: Quantity[]) {
        // Step 1: Calculate total volume
        const totalVolume = items.reduce((sum, item) => sum + item.product.length * item.product.breadth * item.product.height, 0);
      
        // Step 2: Calculate average dimensions
        const avgLength = Math.sqrt(items.reduce((sum, item) => sum + Math.pow(item.product.length, 2), 0) / items.length);
        const avgBreadth = Math.sqrt(items.reduce((sum, item) => sum + Math.pow(item.product.breadth, 2), 0) / items.length);
        const avgHeight = Math.sqrt(items.reduce((sum, item) => sum + Math.pow(item.product.height, 2), 0) / items.length);
      
        // Step 3: Calculate scaling factor
        const scalingFactor = Math.cbrt(totalVolume / (avgLength * avgBreadth * avgHeight));
      
        // Step 4: Calculate final dimensions
        const optimalLength = scalingFactor * avgLength;
        const optimalBreadth = scalingFactor * avgBreadth;
        const optimalHeight = scalingFactor * avgHeight;

        // Step 5: Calculate weight
        const totalWeight = items.reduce((sum, item) => sum + item.product.weight, 0);
      
        // Return the results
        return {
            length: optimalLength,
            breadth: optimalBreadth,
            height: optimalHeight,
            weight: totalWeight
        };
    }

    function getOrderItems(storeId: number) {
        const orderItems: any = [];
        itemsQty.map((item: Quantity) => {
        if (item.product.store_id === storeId) {
                const r = (Math.random() + 1).toString(36).substring(7);
                orderItems.push({
                    "name": item.product.name,
                    "sku": `NA-${r}`,
                    "units": item.quantity,
                    "selling_price": item.product.price,
                    "discount": "",
                    "tax": ""
                });
            }
        })
        return orderItems;
    }

    useEffect(() => {
        const calculateStoreTotals = async () => {
            const storeTotals: Record<string, { totalPrice: number; razorpayId: string | null; storeId: number }> = {};
            for (const storeId of storeIds) {
                const storeItems = itemsQty.filter((item: Quantity) => item.product.store_id === storeId);
                const totalPrice = storeItems.reduce((sum: number, item: Quantity) => sum + item.product.price * item.quantity, 0);
                const store = await getStoreById(storeId);
                const razorpayId = store?.razorpayId || null;
                storeTotals[storeId] = { totalPrice, razorpayId, storeId };
            }
            //console.log(JSON.stringify(storeTotals));
            const storeTotalsArrayInternal = Object.values(storeTotals);
            setStoreDetails(storeTotals);
            setStoreTotalsArray(storeTotalsArrayInternal);
            return storeTotals;
        };
        calculateStoreTotals();
        setPackaging(calculateOptimalPackaging(itemsQty));
    }, [itemsQty]);

    useEffect(() => {
        const makeStoreArray = async () => {
            const storeMap = new Map(storeArray.map((store) => [store.id, store]));
            for (const storeId of storeIds) {
              if (!storeMap.has(storeId)) {
                const store = await getStoreById(storeId);
                if (store) {
                  storeMap.set(storeId, store);
                }
              }
            }
            setStoreArray(Array.from(storeMap.values())); // Convert Map back to array
          };
          makeStoreArray();
    }, []);

    const createOrderId = async () => {
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userId,
                    storeIds: Array.from(storeIds),
                    amount: totAmount,
                    currency: 'INR',
                    vendors: storeTotalsArray
                }),
            });
      
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.orderId;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const processSR = async (orderId: string) => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const dateString = yyyy + '/' + mm + '/' + dd + ' ' + hours + ':' + minutes;

        const ShipRocketOrderIds: string[] = [];
        const ShiprocketData: any[] = [];
        const ShiprocketOrder: any[] = [];
        const ShiprocketAwb: any[] = [];
        const ShiprocketPickup: any[] = [];

        for (const store of storeArray) {
            const orderItems: OrderItem[] = getOrderItems(store.id);
            const storeTotal = storeTotalsArray.find((item) => item.storeId === store.id)?.totalPrice || 0;
            const storeOrderId = orderId + '-' + store.id;
            ShipRocketOrderIds.push(storeOrderId);
            const SROrderOptions = {
                "order_id": storeOrderId,
                "order_date": dateString,
                "pickup_location": store.shiprocketPickup,
                "channel_id": "",
                "comment": "",
                "billing_customer_name": bFirstName,
                "billing_last_name": bLastName,
                "billing_address": bAdl1,
                "billing_address_2": bAdl2,
                "billing_city": bCity,
                "billing_pincode": bPincode,
                "billing_state": bState,
                "billing_country": bCountry,
                "billing_email": bEmail,
                "billing_phone": bPhone,
                "shipping_is_billing": true,
                "shipping_customer_name": "",
                "shipping_last_name": "",
                "shipping_address": "",
                "shipping_address_2": "",
                "shipping_city": "",
                "shipping_pincode": "",
                "shipping_country": "",
                "shipping_state": "",
                "shipping_email": "",
                "shipping_phone": "",
                "order_items": orderItems,
                "payment_method": "Prepaid",
                "shipping_charges": 0,
                "giftwrap_charges": 0,
                "transaction_charges": 0,
                "total_discount": 0,
                "sub_total": storeTotal,
                "length": 8,
                "breadth": 5,
                "height": 3 * orderItems.length,
                "weight": 0.2 * orderItems.length
            }
            ShiprocketData.push(SROrderOptions);
            const SRorderResJson = await createOrderSR(SROrderOptions);
            ShiprocketOrder.push(SRorderResJson);
            const Shipment_Id = SRorderResJson.shipment_id;
            const SRawbResJson = await generateAwbSR(Shipment_Id);
            ShiprocketAwb.push(SRawbResJson);
            const SRpickupResJson = await generatePickupSR(Shipment_Id);
            ShiprocketPickup.push(SRpickupResJson);
            await new Promise(r => setTimeout(r, 3000));
        }
        console.log(ShipRocketOrderIds, ShiprocketData, ShiprocketOrder);
        return { ShipRocketOrderIds, ShiprocketData, ShiprocketOrder, ShiprocketAwb, ShiprocketPickup };
    }

    const processPayment = async () => {
        try {
            const orderId: string = await createOrderId();
            const options = {
                key: process.env.key_id,
                amount: totAmount,
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
                if (res.isOk) {
                    const {ShipRocketOrderIds, ShiprocketData, ShiprocketOrder, ShiprocketAwb, ShiprocketPickup} = await processSR(orderId);
                    const SRdataDB = await addShiprocketData(orderId, ShiprocketData);
                    const SRorderDB = await addShipRocketOrder(orderId, ShiprocketOrder);
                    const SRawbDB = await addShiprocketAwb(orderId, ShiprocketAwb);
                    const SRpickupDB = await addShiprocketPickup(orderId, ShiprocketPickup);
                    const SRinvoicesJson = await generateInvoicesSR(ShipRocketOrderIds).then(async (res) => {
                        const SRinvoicesDB = await addShipRocketInvoice(orderId, res);
                    });
                    toast.success("payment succeeded");
                }
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="m-4">
                <p className="text-2xl font-semibold">Your Cart</p>
                <Button onClick={() => console.log(cart.items)} className="m-4">Test</Button>
            </div>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2">
                    {itemsQty && !loading && itemsQty.map((product) => (
                        <div key={product.product.id} className="ml-4 flex flex-col justify-between items-center">
                            <ModelCard key={product.product.id} product={product.product} />
                            <div className="flex mb-4 rounded-lg border border-gray-200 overflow-hidden w-fit">
                                <ItemQuantityBox item={product} />
                            </div>
                        </div>
                    ))}
                </div>
                {cart.items.length === 0 && !loading && <div className="ml-4">No products found</div>}
                {loading && <div className="ml-4 mt-8"><BeatLoader /></div>}
            </div>
            <div>
                <div className="flex">
                    <Input required className="m-4" placeholder="Enter first name" defaultValue={first_name || ""} value={bFirstName} onChange={(e) => setBFirstName(e.target.value)} />
                    <Input required className="m-4" placeholder="Enter last name" defaultValue={last_name || ""} value={bLastName} onChange={(e) => setBLastName(e.target.value)} />
                </div>
                    <Input className="m-4" required placeholder="Enter email" defaultValue={email} value={bEmail} onChange={(e) => setBEmail(e.target.value)} />
                    <Input className="m-4" required placeholder="Enter phone number" defaultValue={phone} value={bPhone} onChange={(e) => setBPhone(e.target.value)} />
                <div>
                    <div className="ml-4">Enter your address</div>
                    <div className="m-4"><Input required placeholder="Address Line 1" value={bAdl1} onChange={(e) => setBAdl1(e.target.value)} /></div>
                    <div className="m-4"><Input required placeholder="Address Line 2" value={bAdl2} onChange={(e) => setBAdl2(e.target.value)} /></div>
                    <div className="flex">
                        <div className="m-4"><Input required placeholder="City" value={bCity} onChange={(e) => setBCity(e.target.value)} /></div>
                        <div className="m-4"><Input required placeholder="Pincode" value={bPincode} onChange={(e) => setBPincode(e.target.value)} /></div>
                    </div>
                    <div className="flex">
                        <div className="m-4"><Input required placeholder="State" value={bState} onChange={(e) => setBState(e.target.value)} /></div>
                        <div className="m-4"><Input required placeholder="Country" value={bCountry} onChange={(e) => setBCountry(e.target.value)} /></div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center">
                    <input type="radio" name="billing" onChange={() => setShippingIsBilling(true)} className="m-4" defaultChecked />
                    <div>Billing address same as shipping address</div>
                </div>
                <div className="flex items-center">
                    <input type="radio" name="billing" onChange={() => setShippingIsBilling(false)} className="m-4" />
                    Billing address different
                </div>
            </div>
            {!shippingIsBilling &&
                <div>
                    <div className="flex">
                        <Input required className="m-4" placeholder="Enter first name" defaultValue={bFirstName} value={shippingFirstName} onChange={(e) => setShippingFirstName(e.target.value)} />
                        <Input required className="m-4" placeholder="Enter last name" defaultValue={bLastName} value={shippingLastName} onChange={(e) => setShippingLastName(e.target.value)} />
                    </div>
                    <div>
                        <div className="ml-4">Enter your address</div>
                        <Input className="m-4" required placeholder="Address Line 1" value={shippingAdl1} onChange={(e) => setShippingAdl1(e.target.value)} />
                        <Input className="m-4" required placeholder="Address Line 2" value={shippingAdl2} onChange={(e) => setShippingAdl2(e.target.value)} />
                        <div className="flex">
                            <Input className="m-4" required placeholder="City" value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} />
                            <Input className="m-4" required placeholder="Pincode" value={shippingPincode} onChange={(e) => setShippingPincode(e.target.value)} />
                        </div>
                        <div className="flex">
                            <Input className="m-4" required placeholder="State" value={shippingState} onChange={(e) => setShippingState(e.target.value)} />
                            <Input className="m-4" required placeholder="Country" value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} />
                        </div>
                        <Input className="m-4" required placeholder="Enter email" defaultValue={bEmail} value={shippingEmail} onChange={(e) => setShippingEmail(e.target.value)} />
                        <Input className="m-4" required placeholder="Enter phone number" defaultValue={bPhone} value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} />
                    </div>
                </div>
            }
            <Button onClick={processPayment} className="m-4">Proceed to payment</Button>
        </div>
    );
}

export default CheckoutPageClient;