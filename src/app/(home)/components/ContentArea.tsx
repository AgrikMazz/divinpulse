"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Product, Store } from "@/types/types";
import ModelCard from "@/app/components/ModelCard";
import PilgrimageCard from "@/app/components/PilgrimageCard";
import BlogCard from "@/app/components/BlogCard";

import LightPoster from "../../../../public/posters/Light-Poster.jpg"
import AllReligions from "../../../../public/posters/All.jpg"
import Sunset1 from "../../../../public/landing/Landing.jpg"
import Sunset2 from "../../../../public/landing/Landing2.jpg"
import { blogs, card_contents_1, card_contents_2, pilgrimages } from "@/lib/list";
import loadStoreIcon from "@/app/actions/loadStoreIcon";
import { useRouter } from "next/navigation";

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
    {stores && stores.forEach(async (store) => {
        storeImages.push(loadStoreIcon(store));
    })}
    const router = useRouter();
  
    return (
        <div>
            <div className="flex flex-col rounded-md items-center justify-center">
                <div className="mb-10">
                    <div className="flex flex-col justify-center max-w-7xl mt-8 mx-4">
                        <div className="flex p-4 my-4 gap-x-4">
                            <div className="">
                                <img className="object-cover h-full w-full overflow-hidden aspect-square rounded-lg" src={Sunset1.src} alt="banner" />
                            </div>
                            <div>
                                <h1 className="text-xl font-serif font-semibold mb-3">DivinPulse, a journey through time and faith</h1>
                                <p>At Divin Pulse, we believe that every artifact is a doorway to understanding the deeper aspects of faith and spirituality. As you explore our collections, you’re not just purchasing a piece of history—you’re connecting with the countless souls who have cherished these symbols of devotion. Each artifact we offer has been carefully preserved and curated to retain its spiritual integrity and significance, allowing you to experience a tangible link to the past.</p>
                            </div>
                        </div>
                        <div className="flex p-4 my-4 gap-x-4">
                            <div>
                                <h1 className="text-xl font-serif font-semibold mb-3">Our Commitment to Quality and Integrity</h1>
                                <p>We understand that when it comes to religious artifacts, authenticity and quality are paramount. That’s why at Divin Pulse, we are dedicated to providing only the most genuine and meticulously crafted items. Our commitment extends beyond just offering products—we strive to ensure that each piece you acquire holds true to its historical and spiritual origins.</p>
                            </div>
                            <div className="">
                                <img className="object-cover h-full w-full overflow-hidden aspect-square rounded-lg" src={Sunset2.src} alt="banner" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-serif font-semibold text-violet-900 mt-10 ml-4">Browse our catalogs</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {products?.map((product, index) => (
                                <div key={product.id}>
                                    {index<8 && <ModelCard key={product.id} product={product} />}
                                </div>
                            ))}
                        </div>
                        <button className="border border-black text-sm font-semibold w-96 rounded-full p-3 mt-4 hover:bg-slate-100 hover:scale-105 transition" onClick={() => router.push("/search")}>See more items</button>
                    </div>
                </div>
                <div className="">
                        <div className="relative container mx-auto grid grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-x-24 gap-y-10 w-full h-full mt-6 mb-20">
                            {card_contents_1.map((content, index) => (
                                <div key={index}>
                                    <h1 className="text-2xl text-center text-[#565694] font-serif font-semibold mb-2">{content.title}</h1>
                                    <div key={index} className="bg-white opacity-80 border rounded-lg flex flex-col gap-y-3 p-3 h-32 overflow-y-hidden">
                                        <p className="text-lg">{content.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
                <div className="mb-10">
                    <h1 className="text-3xl font-serif font-semibold text-violet-900 ml-4 text-left">Explore Pilgrimages</h1>
                    <div className="flex flex-col items-center justify-center">
                        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            {stores?.map((store, index) => (
                                <div key={store.id}>
                                    <PilgrimageCard key={store.id} store={store} />
                                </div>
                            ))}
                        </div>
                        <button className="border border-black text-sm font-semibold mt-2 w-96 rounded-full p-3 hover:bg-slate-100 hover:scale-105 transition" onClick={() => router.push("/search/store")}>Explore</button>
                    </div>
                </div>
                {/*<div className="relative flex flex-col justify-center text-center h-[700px] w-full mb-10">
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
                </div>*/}
                <div className="mb-10 bg-[#565694]">
                    <h1 className="text-2xl font-serif font-semibold ml-4 my-8 text-center text-white">Blogs</h1>
                    <h2 className="text-lg font-serif ml-4 my-8 text-center text-white">Read about India&apos;s rich cultural heritage</h2>
                    <div className="flex flex-col items-center justify-center">
                        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-3 mx-4 lg:grid-cols-4 gap-2">
                            {blogs?.map((blog, index) => (
                                <div key={index}>
                                    <BlogCard title={blog.title} description={blog.description} image={blog.image.src} />
                                </div>
                            ))}
                        </div>
                        <button className="text-sm font-semibold w-72 rounded-full p-3 bg-[#F7FCFF] hover:bg-slate-100 hover:scale-105 transition mt-6 mb-12">See more blogs</button>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center max-w-7xl mx-4">
                    <div className="">
                        <h1 className="text-xl font-serif font-semibold mb-3">DivinPulse, a journey through time and faith</h1>
                        <p>We invite you to become a part of the Divin Pulse community, where you can engage with like-minded individuals who share your passion for spiritual exploration. Follow us on social media, participate in our online discussions, and stay informed about upcoming events, exhibitions, and new arrivals in our collection.</p>
                    </div>
                    <Button className="my-6 bg-[#565694] hover:bg-violet-900 w-48">Join our waitlist</Button>
                </div>
            </div>
            <Separator className="my-2 w-[96%]" />
            <div className="text-center my-5">
            </div>
        </div>
    );
}

export default ContentArea;
