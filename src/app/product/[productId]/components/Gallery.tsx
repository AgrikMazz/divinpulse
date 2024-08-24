"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useImageModal from "@/hooks/useImageModal";
import { Image as ImageType } from "@/types/types";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ArrowBigLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CartPageClientProps {
    imageInfo: ImageType;
}

const Gallery: React.FC<CartPageClientProps> = ({ imageInfo }) => {
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const ImageModal =useImageModal();

    return (
        <div className="flex gap-x-4 h-fit max-w-[750px] aspect-6/5">
            <ScrollArea className="relative border shadow-md rounded-md h-full max-w-28 overflow-y-hidden">
                <TabGroup>
                    <TabList className="flex relative flex-col flex-grow gap-y-2 py-2">
                        {imageInfo && imageInfo.imageUrls.map((imageUrl, index) => (
                            <Tab
                                key={index}
                                value={imageUrl}
                                onKeyDown={
                                    e => {
                                        if(e.key === 'ArrowRight') {
                                            if(activeImgIndex < imageInfo.imageUrls.length - 1) {
                                                setActiveImgIndex(activeImgIndex + 1)
                                            } else {
                                                setActiveImgIndex(0)
                                            }
                                        }
                                        if(e.key === 'ArrowLeft') {
                                            if(activeImgIndex > 0) {
                                                setActiveImgIndex(activeImgIndex - 1)
                                            } else {
                                                setActiveImgIndex(imageInfo.imageUrls.length - 1)
                                            }
                                        }
                                    }
                                }
                                onPointerDown={() => setActiveImgIndex(index)}
                                onMouseDown={() => setActiveImgIndex(index)}
                                className="aspect-square overflow-y-hidden relative rounded-md mx-2 hover:shadow-md"
                            >
                                <img src={imageUrl} alt="image" className="aspect-square object-contain" />
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
            </ScrollArea>
            <div className="flex aspect-square h-full relative bg-slate-100 rounded-md">
                <ChevronLeft onClick={() => setActiveImgIndex(activeImgIndex === 0 ? imageInfo.imageUrls.length - 1 : activeImgIndex - 1)} className="absolute top-1/2 -translate-y-3 translate-x-1 cursor-pointer bg-white rounded-full hover:scale-105 border shadow-lg" />
                <img src={imageInfo.imageUrls[activeImgIndex]} alt="image" className="aspect-square object-contain rounded-md" />
                <ChevronRight onClick={() => setActiveImgIndex(activeImgIndex === imageInfo.imageUrls.length - 1 ? 0 : activeImgIndex + 1)} className="absolute top-1/2 right-0 -translate-y-3 -translate-x-1 cursor-pointer bg-white rounded-full hover:scale-105 border shadow-lg" />
            </div>
        </div>
    );
}
 
export default Gallery;