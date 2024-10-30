import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.key_id!,
    key_secret: process.env.key_secret,
});

export async function POST(request: NextRequest) {
    try {
        const invoice = await razorpay.invoices.create({
            type: 'invoice',
            date: Math.floor(Date.now() / 1000),
            customer: {
                name: "Agrik",
            },
            line_items: [
                {
                    name: 'Purchase',
                    description: 'Product description',
                    amount: 500,
                    currency: "INR",
                    quantity: 1,
                },
            ],
            receipt: "rcp",
        });
        console.log('Invoice created:', JSON.stringify(invoice));
        return NextResponse.json({ invoiceId: invoice.id }, { status: 200 });
    } catch (error) {
        console.error('Error generating invoice:', error);
        return NextResponse.json({ error: 'Error generating invoice' }, { status: 500 });
    }
}
