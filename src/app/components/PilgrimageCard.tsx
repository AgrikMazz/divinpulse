import { MapPin } from "lucide-react";
import Link from "next/link";

interface Props {
    name: string
    location: string
    image: string
}

const PilgrimageCard: React.FC<Props> = ({
    name,
    location,
    image
}) => {
    return (
        <div className="bg-white overflow-hidden flex flex-col rounded-lg m-4 p-2 max-w-full transition hover:shadow-lg">
            <div className="aspect-square bg-gray-100 rounded-md transition">
                <img
                    src={image}
                    alt="temple"
                    className="aspect-square object-contain"
                />
            </div>
                <div className="flex flex-col items-start justify-between">
                    <h2 className="text-lg">{name}</h2>
                    <div className="flex text-sm items-center text-gray-600 justify-between">
                        <MapPin className="inline-block w-4 h-4" />
                        {location}
                    </div>
                </div>
                <Link href={`/pilgrimages/${name}`} className="text-sm font-medium rounded-md border border-gray-500 m-2 p-2 text-center hover:bg-gray-200 transition">
                    Explore Pilgrimage
                </Link>
            </div>
    );
}
 
export default PilgrimageCard;