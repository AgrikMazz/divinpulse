import Image from "next/image";
import Banner from "../../../../public/home/image.png"
const StartArea = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative opacity-95 flex flex-col justify-center text-center w-full">
                <Image
                    className="object-cover h-full w-full overflow-hidden"
                    src={Banner.src}
                    alt="banner"
                    width={Banner.width}
                    height={Banner.height}
                />
                <div className="text-left absolute p-6 h-3/4 w-fit md:max-w-[500px] max-w-96 left-10 slide-out-to-top-1/2">
                    <h1 className="mb-2 text-5xl font-serif">Divinepulse</h1>
                    <h2 className="mb-2 text-2xl font-serif">A Journey Through Time and Faith</h2>
                </div>
            </div>
        </div>
    );
}

export default StartArea;
