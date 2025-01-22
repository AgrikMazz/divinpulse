import { Store } from "@/types/types";
import { MapPin } from "lucide-react";
import Link from "next/link";
import loadStoreIcon from "../actions/loadStoreIcon";

interface Props {
    store: Store
}

const PilgrimageCard: React.FC<Props> = ({
    store
}) => {
    const imagePath = loadStoreIcon(store);
    return (
        <div className="bg-zinc-50 overflow-hidden flex flex-col rounded-lg m-4 p-2 max-w-full transition hover:shadow-lg">
            <div className="aspect-square bg-slate-200 rounded-md transition">
                <img
                    src={imagePath}
                    alt="temple"
                    className="aspect-square object-contain"
                />
            </div>
                <div className="flex flex-col items-start justify-between">
                    <h2 className="text-lg">{store.name}</h2>
                    <div className="flex text-sm items-center text-gray-600 justify-between">
                        {store.city ?
                        <div>
                            <MapPin className="inline-block w-4 h-4" />
                            {store.city}
                        </div> : 
                        <div className="h-4"></div>}
                    </div>
                </div>
                <Link href={`/store/${store.id}`} className="text-sm font-medium rounded-md border border-gray-500 m-2 p-2 text-center hover:bg-gray-200 transition">
                    Explore Pilgrimage
                </Link>
            </div>
    );
}
 
export default PilgrimageCard;
