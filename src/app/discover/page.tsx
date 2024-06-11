import Footer from "@/components/Footer";
import ArtifactMC from "./components/ArtifactMC";
import { Button } from "@/components/ui/button";
import PilgrimMC from "./components/PilgrimMC";
import PilStories from "./components/PilStories";
import Items from "./components/Items";
import discover from "../../../public/discover.jpg"
import Image from "next/image";

const Discover = () => {
    return (
        <div className="h-full w-full bg-white items-center justify-between">
            <div className="mb-2 h-[300px] w-full bg-[length:50%] bg-repeat bg-[url('/pattern.jpg')]">
                
            </div>
            <Items />
            <div className="flex flex-col justify-between items-center">
                <Button className="mb-4 hover:scale-110 transition">Explore</Button>
            </div>
            <PilStories />
            <Footer />
        </div>
    );
}
 
export default Discover;