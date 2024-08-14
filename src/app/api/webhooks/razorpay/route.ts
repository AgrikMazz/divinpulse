import type { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { writeFile } from 'fs';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

const razorpay = new Razorpay({
  key_id: process.env.key_id!,
  key_secret: process.env.key_secret!,
});

async function generateInvoice(payment: any) {
  try {
    const invoice = await razorpay.invoices.create({
      type: 'invoice',
      date: Math.floor(Date.now() / 1000),
      customer: {
        name: payment.notes.customer_name,
        email: payment.email,
        contact: payment.contact,
      },
      line_items: [
        {
          name: 'Purchase',
          description: 'Product description',
          amount: payment.amount,
          currency: payment.currency,
          quantity: 1,
        },
      ],
      receipt: payment.receipt,
    });
    console.log('Invoice created:', invoice);
    writeFile('./invoice.json', JSON.stringify(invoice), (err) => {
      if (err) throw err;
      console.log('Invoice saved to invoice.json');
    })
  } catch (error) {
    console.error('Error generating invoice:', error);
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Step 1: Get the raw body
      const rawBody = await getRawBody(req);

      // Step 2: Verify the webhook signature
      const signature = req.headers['x-razorpay-signature'] as string;
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(rawBody)
        .digest('hex');

      if (generatedSignature !== signature) {
        return new NextResponse('Invalid signature', { status: 400 });
      }

      // Step 3: Parse the raw body and handle the event
      const event = JSON.parse(rawBody.toString());

      if (event.event === 'payment.captured') {
        // Handle the payment.captured event
        await generateInvoice(event.payload.payment.entity);
      }

      return new NextResponse('Webhook received', { status: 200 });
    } catch (error) {
      console.error('Webhook error:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
};
