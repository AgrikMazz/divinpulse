import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const supabase = createClientComponentClient();
        const body = await req.json();

        const { 
            storename,
            subheading,
            about,
            image
         } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 } )
        }

        if (!storename) {
            return new NextResponse("Storename is required", { status: 400 } )
        }

        const { data, error } = await supabase.storage.from('store-images').upload(`image-${userId}-${storename}`, image.file, {
            cacheControl: '3600',
            upsert: false
        });
        const store = await supabase.from('stores').insert([{ name: storename, userId: userId, label: subheading, about: about, imageUrl: data?.path }]).select('*')
        
        return new NextResponse(JSON.stringify(store), { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
