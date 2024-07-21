"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageType } from "@/types/types";
import { useState } from "react";

interface CartPageClientProps {
    imageInfo: ImageType;
}

const Gallery: React.FC<CartPageClientProps> = ({ imageInfo }) => {
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

    return (
        <div>
            <Tabs defaultValue="account" className="w-[400px]">
                    <div className="aspect-square relative bg-slate-100 h-full w-full rounded-md">
                        <img src={imageInfo.imageUrls[activeImgIndex]} alt="image" className="aspect-square object-contain" />
                    </div>
                <TabsList className="">
                    {imageInfo && imageInfo.imageUrls.map((imageUrl, index) => (
                        <TabsTrigger key={index} value={imageUrl} onPointerDown={() => setActiveImgIndex(index)} onMouseDown={() => setActiveImgIndex(index)} className="aspect-square relative h-full w-full rounded-md mx-2">
                            <div className="aspect-square relative bg-slate-100 h-full w-full rounded-md">
                                <img src={imageUrl} alt="image" className="aspect-square object-contain" />
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
 
export default Gallery;