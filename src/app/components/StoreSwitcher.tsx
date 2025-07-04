"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useStoreModal from "@/hooks/useStoreModal";
import { cn } from "@/lib/utils";
import { Store } from "@/types/types";
import { Check, ChevronDownIcon, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    allStores: Store[] | null,
    allUserStores: Store[] | null
}

function StoreSwitcher({
    allStores,
    allUserStores
}: StoreSwitcherProps) {    
    const params = useParams();
    const router = useRouter();
    const StoreModal = useStoreModal();
    let currentStore: Store | undefined;
    allStores ? currentStore = allStores.find((store) => store.id === Number(params.storeId)) : null;
    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: {id: number, name: string}) => {
        setOpen(false);
        router.push(`/store/${store.id}`);
        router.refresh();
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"default"} role="combobox" aria-expanded={open} aria-label="Select a store" className="w-full justify-between p-2 bg-[#F7FCFF] hover:bg-slate-100">
                    <StoreIcon className="mr-2 text-black h-4 w-4" />
                    <ChevronDownIcon className="text-black h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    {allStores && allStores.length>0 && <div><CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {allStores.map((store) => (
                                <CommandItem
                                    key={store.id}
                                    onSelect={() => onStoreSelect(store)}
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.name}
                                    <Check className={cn("ml-auto h-4 w-4", currentStore?.id === store.id ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator /></div>}
                    {allUserStores && allUserStores.length>0 && <div><CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {allUserStores.map((store) => (
                                <CommandItem
                                    key={store.id}
                                    onSelect={() => onStoreSelect(store)}
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.name}
                                    <Check className={cn("ml-auto h-4 w-4", currentStore?.id === store.id ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator /></div>}
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    StoreModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default StoreSwitcher;
