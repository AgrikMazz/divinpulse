import Image from "next/image";
import vase from "../../../../public/vase.jpg"

const ModelCard = () => {
    return (
        <div className="bg-white rounded-lg m-4 max-w-72">
            <div className="rounded-lg p-3">
                <Image
                    src={vase}
                    alt="Ceramic Vase"
                />
            </div>
            <div className="p-2 flex flex-col items-center justify-between">
                <div className="p-2 bg-secondary mb-1 rounded-lg justify-between">$19.99</div>
                <h2 className="text-2xl mb-2 font-semibold text-gray-700">Ceramic Vase</h2>
                <p className="text-gray-600 mb-2 max-w-[80%] text-center">This vase is perfect for showcasing your art.</p>
            </div>
        </div>
    );
}
 
export default ModelCard;