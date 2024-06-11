import Image from "next/image";
import vase from "../../../../public/vase.jpg"
//import ReactStars from "react-stars";

const ArtifactMC = () => {
    return (
        <div className="flex flex-row bg-gray-200 rounded-lg m-2 p-3">
            <div>
                <Image src={vase} alt="Ceramic Vase" width={120} height={120} className="rounded-lg mr-6" />
            </div>
            <div>
                <h1 className="text-2xl font-semibold">Ceramic Vase</h1>
                
                <div className="flex flex-row space-x-4">
                    <p>Rating: 4.5</p>
                    <p>Reviews: 10</p>
                </div>
            </div>
        </div>
    );
}

export default ArtifactMC;