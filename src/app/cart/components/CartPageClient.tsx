"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CardPageClient=()=>{
    const router = useRouter();
    return (
        <div>            
            <Button onClick={() => router.push("/checkout")} className="m-4">Proceed to checkout</Button>
        </div>
    );
}
 
export default CardPageClient;