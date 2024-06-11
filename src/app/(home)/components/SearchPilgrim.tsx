import Image from "next/image";
import vase from "../../../../public/vase.jpg"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TypeModelCard from "./TypeModelCard";
import { Separator } from "@/components/ui/separator";
import { FaHourglassEnd, FaPaintRoller } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SearchPilgrim = () => {
    return (
        <div className="flex flex-col rounded-md items-center justify-between bg-white">
            <h1 className="text-3xl font-semibold p-2 m-2">Search Pilgrim</h1>
            <ScrollArea className="w-[60%] mb-6 whitespace-nowrap rounded-md border">
                <div className="flex p-4 gap-x-4">
                    <span className="flex flex-col items-center"><Image src={vase} alt="Ceramic Vase" className="rounded-xl mb-2 max-h-40 max-w-40" />Pilgrim 1</span>
                    <span className="flex flex-col items-center"><Image src={vase} alt="Ceramic Vase" className="rounded-xl mb-2 max-h-40 max-w-40" />Pilgrim 2</span>
                    <span className="flex flex-col items-center"><Image src={vase} alt="Ceramic Vase" className="rounded-xl mb-2 max-h-40 max-w-40" />Pilgrim 3</span>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Separator className="my-2 w-[96%]" />
            <div>
                <Carousel>
                    <CarouselContent className=" w-80">
                        <CarouselItem><TypeModelCard /></CarouselItem>
                        <CarouselItem><TypeModelCard /></CarouselItem>
                        <CarouselItem><TypeModelCard /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <Separator className="my-2 w-[96%]" />
            <div className="text-center my-5">
                <h1 className="text-3xl font-semibold p-2 mb-6">Love our artifacts?</h1>
                <p className="my-2 max-w-[500px]">Join our annual membership and enjoy exclusive discounts on artifacts. Plus, receive a bonus artifact with each purchase.</p>
                <div className="flex items-center justify-center my-10">
                    <div className="flex flex-col justify-between items-center mx-4">
                        <div className="flex items-center justify-center w-28 h-28 bg-gray-200 rounded-lg"><FaPaintRoller size={50} /></div>
                        <div className=" bg-gray-200 rounded-lg my-4 p-1 w-32 font-semibold text-lg text-gray-700">Choose your favourite</div>
                    </div>
                    <div className="flex flex-col justify-between items-center mx-4">
                        <div className="flex items-center justify-center w-28 h-28 bg-gray-200 rounded-lg"><FaHourglassEnd size={50} /></div>
                        <div className=" bg-gray-200 rounded-lg my-4 p-1 w-32 font-semibold text-lg text-gray-700">Select frequency</div>
                    </div>
                    <div className="flex flex-col justify-between items-center mx-4">
                        <div className="flex items-center justify-center w-28 h-28 bg-gray-200 rounded-lg"><MdDeleteForever size={66} /></div>
                        <div className=" bg-gray-200 rounded-lg my-4 p-1 w-32 font-semibold text-lg text-gray-700">Cancel anytime</div>
                    </div>
                </div>
                <div className="mb-6">
                    <Button className="mb-6">Join now</Button>
                    <p>Already a member?</p>
                    <p>Update your preferences <a className="text-blue-500 underline">here.</a></p>
                </div>
            </div>
        </div>
    );
}
 
export default SearchPilgrim;