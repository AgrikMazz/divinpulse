"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import useImageModal from "@/hooks/useImageModal";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface ProductCollapsibleProps {
    children: React.ReactNode,
    title: string,
    className?: string
}

const ProductCollapsible: React.FC<ProductCollapsibleProps> = ({
    children,
    title,
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                <CollapsibleTrigger className="w-full flex items-center justify-between">
                    <button className="flex items-center justify-between text-sm font-semibold w-full rounded-full p-3 mt-2 hover:bg-slate-100 transition">
                        <div>{title}</div>
                        {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className={cn(className)}>
                    {children}
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
 
export default ProductCollapsible;