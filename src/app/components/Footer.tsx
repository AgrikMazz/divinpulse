import { GoChevronDown } from "react-icons/go";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Buttons = ["Home", "Artifacts", "About", "Journal", "Craftsmen", "Artisans", "Updates", "Community", "Stories"]

const Footer = () => {
    return (
        <div className="w-full bg-neutral-900 p-4">
            <div className="flex flex-row justify-between p-2 mb-2">
                <div>
                    <h1 className="text-3xl text-white font-semibold">PilgrimTales</h1>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex py-1 px-2 items-center font-semibold bg-gray-400 rounded-xl">
                            ENG
                            <GoChevronDown className="ml-3 p-1 h-6 w-6 rounded-full hover:bg-slate-300 transition" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>English</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator className="my-2 bg-slate-200" />
            <div className="grid max-w-5xl justify-self-center mb-6 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                <span><Button variant={"link"} className="text-white font-semibold">Home</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">Artifacts</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">About</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">Journal</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">Craftsmen</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">Artisans</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">Updates</Button></span>
                <span><Button variant={"link"} className="text-white font-semibold">Community</Button></span>
            
            </div>
            <Separator className="my-2 bg-slate-200" />
            <div className="">
                <h1 className="text-3xl text-white justify-center font-semibold">PilgrimTales</h1>
            </div>
        </div>
    );
}

export default Footer;