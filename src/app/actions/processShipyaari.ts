import toast from "react-hot-toast";
import { getToken } from "./getToken";

export const getServicibility = async (data: any) => {
    console.log(data);
    const SR_Token = await getToken();
    const labelRes = await fetch('https://api-seller.shipyaari.com/api/v1/order/checkServiceabilityV2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    });
    if (!labelRes.ok) {toast.error('Get serviceability failed.'); throw new Error('Get serviceability failed.');}
    const labelResJson = await labelRes.json();
    return labelResJson;
}

export const createOrderSR = async (order: any) => {
    const SR_Token = await getToken();
    const orderRes = await fetch('https://apiv2.shipyaari.in/v1/external/orders/create/adhoc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(order)
    });
    if (!orderRes.ok) {toast.error('Shipyaari order creation failed.'); throw new Error('Shipyaari order creation failed.');}
    const orderResJson = await orderRes.json();
    console.log(orderResJson);
    return orderResJson;
}

export const generateAwbSR = async (shipment_id: string) => {
    const SR_Token = await getToken();
    const awbRes = await fetch('https://apiv2.shipyaari.in/v1/external/courier/assign/awb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            shipment_id: shipment_id
        })
    });
    if (!awbRes.ok) {toast.error('AWB generation failed.');  throw new Error('AWB generation failed.');}
    const awbResJson = await awbRes.json();
    return awbResJson;
}

export const generatePickupSR = async (shipment_id: string) => {
    const SR_Token = await getToken();
    const pickupRes = await fetch('https://apiv2.shipyaari.in/v1/external/courier/generate/pickup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            shipment_id: shipment_id
        })
    });
    if (!pickupRes.ok) {toast.error('Pickup generation failed.'); throw new Error('Pickup generation failed.');}
    const pickupResJson = await pickupRes.json();
    return pickupResJson;
}

export const generateManifestsSR = async (shipment_id: string[]) => {
    const SR_Token = await getToken();
    const manifestRes = await fetch('https://apiv2.shipyaari.in/v1/external/manifests/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            shipment_id: shipment_id
        })
    });
    if (!manifestRes.ok) {toast.error('Manifest generation failed.'); throw new Error('Manifest generation failed.');}
    const manifestResJson = await manifestRes.json();
    return manifestResJson;
}

export const generateLabelsSR = async (shipment_id: string[]) => {
    const SR_Token = await getToken();
    const labelRes = await fetch('https://apiv2.shipyaari.in/v1/external/courier/generate/label', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            shipment_id: shipment_id
        })
    });
    if (!labelRes.ok) {toast.error('Label generation failed.'); throw new Error('Label generation failed.');}
    const labelResJson = await labelRes.json();
    return labelResJson;
}

export const generateInvoicesSR = async (shipment_id: string[]) => {
    const SR_Token = await getToken();
    const invoicesRes = await fetch('https://apiv2.shipyaari.in/v1/external/orders/print/invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SR_Token}`,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            shipment_id: []
        })
    });
    if (!invoicesRes.ok) { toast.error('Invoice generation failed.'); throw new Error('Invoice generation failed.');}
    const invoicesResJson = await invoicesRes.json();
    return invoicesResJson;
}
