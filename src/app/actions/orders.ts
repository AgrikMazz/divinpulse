import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createDbOrderSR = async (consumer_id: string, vendor_ids: number[], order_id: string, rzp_order: any) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").insert({
        consumer_id: consumer_id,
        vendor_id: vendor_ids,
        order_id: order_id,
        rzp_order: rzp_order
    }).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipyaariData = async (order_id: string, shipyaari_data: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shipyaari_data: shipyaari_data
    }).eq("order_id", order_id).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipRocketOrder = async (order_id: string, shipyaari_order: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shipyaari_order: shipyaari_order
    }).eq("order_id", order_id).select("*");
    
    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipyaariAwb = async (order_id: string, shipyaari_awb: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shipyaari_awb: shipyaari_awb
    }).eq("order_id", order_id).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipyaariPickup = async (order_id: string, shipyaari_pickup: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shipyaari_pickup: shipyaari_pickup
    }).eq("order_id", order_id).select("*");
    
    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipRocketInvoice = async (order_id: string, shipyaari_invoice: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shipyaari_invoice: shipyaari_invoice
    }).eq("order_id", order_id).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}