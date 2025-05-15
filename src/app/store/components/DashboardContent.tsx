"use client";

import { Product, Store } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { FaTruck } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdStars } from "react-icons/md";

interface DashboardContentProps {
    store: Store,
    images: {
        iconImageUrl: string
        bannerImageUrl: string
    },
    products: Product[] | null
}

const ContentColumns = [
    {
        name: "Smooth dispatch",
        desc: "Has a history of dispatching on time with tracking.",
        icon: <FaTruck size={24} />
    },
    {
        name: "Speedy replies",
        desc: "Has a history of replying to messages quickly.",
        icon: <TiMessages size={24} />
    },
    {
        name: "DivinPulse reviews",
        desc: "Average review rating is 4.8 or higher.",
        icon: <FaStar size={24} />
    }
]

const DashboardContent: React.FC<DashboardContentProps> = ({
    store,
    images,
    products
}) => {
    const params = useParams();
    const router = useRouter();
    const total_reviews = products ? products.reduce((acc, product) => acc + product.number_of_reviews, 0) : 0;
    const total_sales = products ? products.reduce((acc, product) => acc + product.total_sold, 0) : 0;

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                {images.bannerImageUrl !== null ?
                    <img className="w-full" src={images.bannerImageUrl} /> :
                    <div></div>
                }
                <div className="flex items-center justify-between w-full max-w-7xl max-h-64 bg-slate-50">
                    <div className="flex items-center p-4 my-8">
                        <div className="w-32 h-32 border flex items-center justify-center mx-8 my-2 rounded-lg bg-yellow-50">
                            <img className="rounded-lg" src={images.iconImageUrl} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif">{store.name}</h1>
                            <p className="text-lg font-serif text-gray-800">{store.label}</p>
                            <p className="text-gray-600">{store.city}, {store.country}</p>
                            <div>
                                <div className="text-sm gap-x-2 my-1">
                                    <div className="flex items-center gap-x-1 text-sm text-[#565694] font-semibold w-fit rounded-lg transition">
                                        <MdStars size={16} />
                                        Star seller
                                    </div>
                                        <p>{total_sales} sales, {total_reviews} reviews</p>
                                    </div>
                                </div>
                                <button className="border shadow-xl border-black border-dashed text-sm font-semibold w-fit rounded-full py-2 px-6 mt-3 hover:bg-slate-100  transition">Follow</button>
                        </div>
                    </div>
                    <div className="hidden md:block h-full">
                        <div className="flex flex-col items-center justify-end gap-y-4">
                            <div className="hidden md:flex gap-x-6 mx-4">
                                {ContentColumns.map((column) => (
                                    <div key={column.name} className="flex flex-col items-center text-center justify-center max-w-48">
                                        <div className="text-2xl font-semibold text-[#565694]">{column.icon}</div>
                                        <div className="text-lg font-semibold mb-2">{column.name}</div>
                                        <div className="text-sm">{column.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-full w-full flex justify-end pr-4 mt-4">
                        <button className="flex items-center gap-x-2 text-xs text-[#565694] font-semibold w-fit rounded-lg py-2 px-4 hover:bg-slate-100 transition">
                            <FaPhoneAlt size={16} />
                            Contact
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DashboardContent;
