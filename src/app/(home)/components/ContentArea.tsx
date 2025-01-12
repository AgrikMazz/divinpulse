"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Product, Store } from "@/types/types";
import ModelCard from "@/app/components/ModelCard";
import PilgrimageCard from "@/app/components/PilgrimageCard";
import BlogCard from "@/app/components/BlogCard";

import LightPoster from "../../../../public/posters/Light-Poster.jpg"
import AllReligions from "../../../../public/posters/All.jpg"
import { blogs, card_contents_1, card_contents_2, pilgrimages } from "@/lib/list";
import loadStoreIcon from "@/app/actions/loadStoreIcon";

interface Props {
    products: Product[] | null,
    stores: Store[] | null
}

const ContentArea: React.FC<Props> = ({
    products,
    stores
}) => {
    let storeImages: string[] = [];
    //@ts-ignore
    stores.forEach(async (store) => {
        storeImages.push(loadStoreIcon(store));
    })

    return (
        <div>
            <div className="flex flex-col rounded-md items-center justify-center">
                <div className="mb-10">
                    <h1 className="text-3xl font-serif font-semibold mt-6 text-center">Browse our catalogs</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {products?.map((product, index) => (
                                <div>
                                    {index<8 && <ModelCard key={product.id} product={product} />}
                                </div>
                            ))}
                        </div>
                        <button className="border border-black text-sm font-semibold w-96 rounded-full p-3 mt-4 hover:bg-slate-100 hover:scale-105 transition">See more items</button>
                    </div>
                </div>
                <div className="">
                        <div className="relative mt-8 text-4xl font-serif font-semibold text-center">Our Commitment to Quality and Integrity</div>
                        <div className="relative container mx-auto grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-x-56 gap-y-10 w-full h-full m-14">
                            {card_contents_1.map((content, index) => (
                                <div>
                                    <h1 className="text-2xl text-center text-[#565694] font-serif font-semibold">{content.title}</h1>
                                    <div key={index} className="bg-white opacity-80 border rounded-lg flex flex-col gap-y-3 p-3 items-center justify-center">
                                        <p className="text-lg">{content.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="mb-10">
                    <h1 className="text-3xl font-serif font-semibold ml-4 text-left">Explore Pilgrimages</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {stores?.map((store, index) => (
                                <div key={index}>
                                    <PilgrimageCard name={store.name} location={store.city} image={storeImages[index]} id={store.id} />
                                </div>
                            ))}
                        </div>
                        <button className="border border-black text-sm font-semibold mt-2 w-96 rounded-full p-3 hover:bg-slate-100 hover:scale-105 transition">Explore</button>
                    </div>
                </div>
                <div className="relative flex flex-col justify-center text-center h-[700px] w-full mb-10">
                    <img className="absolute inset-0 opacity-90 object-cover h-full w-full overflow-hidden" src={AllReligions.src} alt="banner" />
                        <div className="relative mt-8 text-4xl font-serif font-semibold">Buy sacred items that align with your faith</div>
                        <div className="relative container mx-auto grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-x-56 gap-y-10 w-full h-full m-14">
                            {card_contents_2.map((content, index) => (
                                <div key={index} className="bg-white opacity-80 border rounded-lg flex flex-col gap-y-3 p-3 items-center justify-center">
                                    <h1 className="text-2xl font-semibold">{content.title}</h1>
                                    <p className="text-lg">{content.content}</p>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="mb-10">
                    <h1 className="text-3xl font-serif font-semibold ml-4 text-left">Read about India's rich cultural heritage</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {blogs?.map((blog, index) => (
                                <div key={index}>
                                    <BlogCard title={blog.title} description={blog.description} image={blog.image.src} />
                                </div>
                            ))}
                        </div>
                        <button className="border border-black text-sm font-semibold mt-2 w-96 rounded-full p-3 hover:bg-slate-100 hover:scale-105 transition">See more blogs</button>
                    </div>
                </div>
            </div>
                <Separator className="my-2 w-[96%]" />
                <div className="text-center my-5">
                    <div className="mb-6">
                        <Button className="mb-6">Join now</Button>
                        <p>Already a member?</p>
                        <p>Update your preferences <a className="text-blue-500 underline">here.</a></p>
                    </div>
                </div>
        </div>
    );
}

export default ContentArea;
