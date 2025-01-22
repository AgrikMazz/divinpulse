import { MapPin } from "lucide-react";
import Link from "next/link";

interface Props {
    title: string
    description: string
    image: string
}

const BlogCard: React.FC<Props> = ({
    title,
    description,
    image
}) => {
    return (
        <div className="bg-gray-50 overflow-hidden flex flex-col rounded-lg m-4 pb-2 w-72 transition hover:shadow-lg">
            <div className="aspect-square bg-slate-200 transition">
                <img
                    src={image}
                    alt="temple"
                    className="aspect-square object-contain rounded-md"
                />
            </div>
                <div className="flex flex-col pt-2 items-start justify-between">
                    <h2 className="text-lg px-2">{title}</h2>
                    <div className="flex text-sm items-center text-gray-600 justify-between p-2">
                        <p>{description}</p>
                    </div>
                </div>
                <Link href={`/blog/${title}`} className="text-sm font-medium rounded-md border border-gray-500 mx-6 mb-2 p-2 text-center hover:bg-gray-200 transition">
                    Read more
                </Link>
        </div>
    );
}

export default BlogCard;
