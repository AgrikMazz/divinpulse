import PilgrimMC from "./PilgrimMC";

const PilStories = () => {
    return (
        <div>
            <div className="text-2xl font-semibold mb-2 ml-4">Pilgrim Stories</div>
            <div className="grid w-lg mb-6 mx-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <PilgrimMC /><PilgrimMC /><PilgrimMC /><PilgrimMC />
            </div>
        </div>
    );
}
 
export default PilStories;