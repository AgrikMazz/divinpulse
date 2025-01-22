import { MapPin } from "lucide-react";
import Link from "next/link";

interface Props {
    name: string
    location: string
    image: string
    id: string
}

const PilgrimageCard: React.FC<Props> = ({
    name,
    location,
    image,
    id
}) => {
    return (
        <div className="bg-zinc-50 overflow-hidden flex flex-col rounded-lg m-4 p-2 max-w-full transition hover:shadow-lg">
            <div className="aspect-square bg-slate-200 rounded-md transition">
                <img
                    src={image}
                    alt="temple"
                    className="aspect-square object-contain"
                />
            </div>
                <div className="flex flex-col items-start justify-between">
                    <h2 className="text-lg">{name}</h2>
                    <div className="flex text-sm items-center text-gray-600 justify-between">
                        {location ?
                        <div>
                            <MapPin className="inline-block w-4 h-4" />
                            {location}
                        </div> : 
                        <div className="h-4"></div>}
                    </div>
                </div>
                <Link href={`/store/${id}`} className="text-sm font-medium rounded-md border border-gray-500 m-2 p-2 text-center hover:bg-gray-200 transition">
                    Explore Pilgrimage
                </Link>
            </div>
    );
}
 
export default PilgrimageCard;