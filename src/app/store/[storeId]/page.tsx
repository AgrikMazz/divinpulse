"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useParams } from "next/navigation";

const Store = async () => {
    const params = useParams();
    const supabase = createClientComponentClient();
    const store = await supabase.from("stores").select().eq("id", params.storeId).single();

    if (!store) { redirect("/"); }

    return (
        <div>
            <p>Navbar for {store.data.name}</p>
            <p>Welcome to dashboard!</p>
        </div>
    );
}
 
export default Store;