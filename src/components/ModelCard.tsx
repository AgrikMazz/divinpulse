import { Product } from "@/types/types";
import loadImage from "@/app/actions/loadImage";

interface ModelCardProps {
    product: Product
}

const ModelCard: React.FC<ModelCardProps> = ({product}) => {

    const imagePath = loadImage(product);

    return (
        <div className=" bg-slate-200 overflow-hidden flex flex-col rounded-lg m-4 max-w-72">
            <div className="  relative p-3">
                <div className="aspect-square bg-gray-100">
                    <img
                        src={imagePath}
                        alt="Ceramic Vase"
                        className=" aspect-square object-contain"
                    />
                </div>
            </div>
            <div className="p-2 flex flex-col items-center justify-between">
                <div className="p-2 bg-gray-50 mb-1 rounded-lg justify-between">Rs. {product.price}</div>
                <h2 className="text-2xl mb-2 font-semibold text-gray-700">{product.name}</h2>
                <p className="text-gray-600 mb-2 max-w-[80%] text-center">{product.description}</p>
            </div>
        </div>
    );
}
 
export default ModelCard;