"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useStoreModal from "@/hooks/useStoreModal";
import { cn } from "@/lib/utils";
import { Check, ChevronDownIcon, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    stores: {id: string, name: string}[];
}

function StoreSwitcher({
    stores = [],
}: StoreSwitcherProps) {    
    const params = useParams();
    const router = useRouter();
    const StoreModal = useStoreModal();

    const formattedStores = stores.map((store) => ({
        name: store.name,
        id: store.id
    }));

    const currentStore = formattedStores.find((store) => store.id === params.storeId)
    const [open, setOpen] = useState(false);

    const onStoreSelect = (store: {id: string, name: string}) => {
        setOpen(false);
        router.push(`/store/${store.id}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} role="combobox" aria-expanded={open} aria-label="Select a store" className="w-[200px] justify-between">
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore ? currentStore.name : "Select a store"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedStores.map((store) => (
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
                    <CommandSeparator />
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
