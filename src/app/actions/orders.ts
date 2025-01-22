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

export const addShiprocketData = async (order_id: string, shiprocket_data: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shiprocket_data: shiprocket_data
    }).eq("order_id", order_id).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipRocketOrder = async (order_id: string, shiprocket_order: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shiprocket_order: shiprocket_order
    }).eq("order_id", order_id).select("*");
    
    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShiprocketAwb = async (order_id: string, shiprocket_awb: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shiprocket_awb: shiprocket_awb
    }).eq("order_id", order_id).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShiprocketPickup = async (order_id: string, shiprocket_pickup: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shiprocket_pickup: shiprocket_pickup
    }).eq("order_id", order_id).select("*");
    
    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}

export const addShipRocketInvoice = async (order_id: string, shiprocket_invoice: any[]) => {
    const supabase = createClientComponentClient();
    const { data: orderData, error: orderError } = await supabase.from("orders").update({
        shiprocket_invoice: shiprocket_invoice
    }).eq("order_id", order_id).select("*");

    if (orderError) {
        console.log(orderError);
        return;
    }

    return orderData;
}