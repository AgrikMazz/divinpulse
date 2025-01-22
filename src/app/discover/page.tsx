import { Button } from "@/components/ui/button";
import PilStories from "./components/PilStories";
import Items from "./components/Items";
import Footer from "../components/Footer";

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