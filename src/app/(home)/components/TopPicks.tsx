import { Button } from "@/components/ui/button";
import ModelCard from "./ModelCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TopPicks = () => {
    return (
        <div className="flex flex-col bg-gray-200 items-center py-8">
            <div className="text-center">
                <h1 className="text-3xl font-semibold p-2 m-2">Top Picks</h1>
                <p className="my-2 max-w-[500px]">Discover our top picks from pilgrims around the globe. Each artifact is handpicked for its unique story and craftsmanship. Experience the world through the eyes of pilgrims.</p>
            </div>
            <Button className="my-4">Explore more</Button>
            <div>
                <Carousel>
                    <CarouselContent className=" w-80">
                        <CarouselItem><ModelCard /></CarouselItem>
                        <CarouselItem><ModelCard /></CarouselItem>
                        <CarouselItem><ModelCard /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}
 
export default TopPicks;