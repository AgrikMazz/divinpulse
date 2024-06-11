import Image from "next/image";
import vase from "../../../../public/vase.jpg"
//import ReactStars from "react-stars";

const PilgrimMC = () => {
    return (
        <div className=" bg-gray-200 rounded-lg m-2 p-3">
            <div className="flex flex-row items-center mb-3">
                <Image src={vase} alt="Ceramic Vase" width={60} height={60} className="rounded-lg mr-6" />
                <h1 className="text-2xl font-semibold">Ceramic Vase</h1>
            </div>
            <div>
                <div className="my-3">
                    <p>Rating: 4.5</p>
                    <p>Shares: 10</p>
                    <p>Topic: Ancient Relics</p>
                </div>
                <div>
                    <p>Discover the history behind these ancient artifacts</p>
                </div>
            </div>
        </div>
    );
}

export default PilgrimMC;
