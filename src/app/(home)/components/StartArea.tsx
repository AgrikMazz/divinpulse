import Banner from "../../../../public/Banner.jpg"
const StartArea = () => {
    return (
        <div className="bg-white flex flex-col items-center justify-center">
            <div className="relative opacity-95 flex flex-col justify-center text-center h-[600px] w-full">
                <img className="object-cover h-full w-full overflow-hidden" src={Banner.src} alt="banner" />
                <div className="text-left absolute p-6 bg-white opacity-75 h-3/4 w-fit md:max-w-[500px] max-w-96 left-10 slide-out-to-top-1/2">
                    <h1 className="mb-2 text-5xl font-semibold">Divinepulse</h1>
                    <h2 className="mb-2 text-2xl font-semibold">A Journey Through Time and Faith</h2>
                    <p>At Divin Pulse, we’re here to support your spiritual journey with artifacts that inspire and uplift. Whether you’re seeking to enhance your personal sanctuary, find the perfect gift, or deepen your understanding of a particular faith, we have the resources and expertise to guide you.</p>
                </div>
            </div>
            <div className="max-w-6xl flex items-center justify-center text-center p-4 my-4">
                <p className="bg-gradient-to-r from-green-500 via-blue-600 to-pink-600 text-transparent bg-clip-text text-2xl font-semibold">At Divin Pulse, we believe that every artifact is a doorway to understanding the deeper aspects of faith and spirituality. As you explore our collections, you’re not just purchasing a piece of history—you’re connecting with the countless souls who have cherished these symbols of devotion. Each artifact we offer has been carefully preserved and curated to retain its spiritual integrity and significance, allowing you to experience a tangible link to the past.</p>
            </div>
        </div>
    );
}

export default StartArea;
