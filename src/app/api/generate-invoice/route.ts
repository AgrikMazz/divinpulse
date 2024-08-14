// pages/api/generate-invoice.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const razorpay = new Razorpay({
    key_id: process.env.key_id!,
    key_secret: process.env.key_secret!,
  });

  const { paymentResult } = req.body;

  const options = {
    type: "invoice",
    currency: "INR",
    amount: 100,
    receipt: "receipt_order_74394",
    description: "Invoice for your purchase",
    line_items: [
      {
        name: "Product Name",
        quantity: 1,
        amount: 5000,
        currency: "INR",
        description: "Product Description",
        taxes: [
          {
            name: "GST",
            percentage: 18,
          },
        ],
      },
    ]
  };

  try {
    const invoice = razorpay.invoices.create(options as any);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Error generating Razorpay invoice' });
  }
}
