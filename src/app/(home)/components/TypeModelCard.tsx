import Image from "next/image";
import vase from "../../../../public/vase.jpg";
import { Button } from "@/components/ui/button";

const TypeModelCard = () => {
    return (
        <div className="bg-gray-200 rounded-lg m-4 max-w-72">
            <div className="rounded-lg p-3">
                <Image
                    src={vase}
                    alt="Ceramic Pottery"
                />
            </div>
            <div className="p-2 flex flex-col items-center justify-between">
                <h2 className="text-2xl mb-2 font-semibold text-gray-700">Ceramic Pottery</h2>
                <p className="text-gray-600 mb-2 max-w-[80%] text-center">This vase is perfect for showcasing your art.</p>
                <div><Button className="my-4">Explore more</Button></div>
            </div>
        </div>
    );
}
 
export default TypeModelCard;