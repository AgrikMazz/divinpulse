import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { createDbOrderSR } from '@/app/actions/orders';

const razorpay = new Razorpay({
    key_id: process.env.key_id!,
    key_secret: process.env.key_secret,
});

export async function POST(request: NextRequest) {
    const { user, storeIds, amount, currency, vendors } = (await request.json()) as {
        user: string;
        storeIds: number[];
        amount: string;
        currency: string;
        vendors: { totalPrice: number; razorpayId: string | null; storeId: number }[];
    };

    const transfers = vendors.map((vendor) => ({
        account: vendor.razorpayId,
        amount: vendor.totalPrice * 0.7 * 100,
        currency: "INR",
        on_hold: false
    }));

    var options = {
        amount: Number(amount) * 100,
        currency: currency,
        receipt: Math.floor(Math.random() * 100000000).toString(),
        transfers: transfers
    };

    const order = await razorpay.orders.create(options);
    console.log("Order===> ", order);
    await createDbOrderSR(user, storeIds, order.id, order);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
}
