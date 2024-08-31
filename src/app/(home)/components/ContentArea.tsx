"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";
import ModelCard from "@/app/components/ModelCard";
import PilgrimageCard from "@/app/components/PilgrimageCard";

import Temple from "../../../../public/Temple.jpeg";
import BlogCard from "@/app/components/BlogCard";

const pilgrimages = [
    {
        name: "Tirupati Temple",
        location: "Andhra Pradesh",
        image: Temple
    }
]

const blogs = [
    {
        title: "Explore the Spiritual Essence of India's Pilgrimage Sites",
        description: "India, a land of rich cultural heritage and deep religious traditions, is home to numerous pilgrimage sites that attract millions of devotees each year. While many...",
        image: Temple
    }
]

interface Props {
    products: Product[] | null
}

const ContentArea: React.FC<Props> = ({
    products
}) => {
    return (
        <div>
            <div className="flex flex-col rounded-md items-center justify-between bg-white">
                <h1 className="text-3xl font-semibold p-2 m-2 text-left">View Items</h1>
                <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {products?.map((product, index) => (
                        <div>
                            {index<8 && <ModelCard key={product.id} product={product} />}
                        </div>
                    ))}
                </div>
                <h1 className="text-3xl font-semibold p-2 m-2 text-left">Pilgrimages</h1>
                <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <PilgrimageCard name={pilgrimages[0].name} location={pilgrimages[0].location} image={pilgrimages[0].image.src} />
                </div>
                <h1 className="text-3xl font-semibold p-2 m-2 text-left">Blogs</h1>
                <div className=" max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <BlogCard title={blogs[0].title} description={blogs[0].description} image={blogs[0].image.src} />
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
