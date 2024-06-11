import Image from "next/image";
import vase from "../../../../public/vase.jpg"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const StartArea = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-semibold p-2">Handicrafted Artifacts</h1>
            <Separator className="my-2 w-[96%]" />
            <div className="rounded-lg p-2 flex justify-center items-center">
                <Image
                    src={vase}
                    alt="Ceramic Vase"
                    height={150}
                    width={150}
                />
            </div>
            <h1 className="text-3xl font-semibold p-2 mt-4">Welcome to Divine Pulse</h1>
            <p className="m-3 max-w-[500px]">Explore the rich stories behind each artifact crafted by pilgrims. From ancient relics to modern treasures, find a piece of history to call your own.</p>
            <Button className="my-8">Explore now</Button>
        </div>
    );
}

export default StartArea;
