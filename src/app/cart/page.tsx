import Footer from "../components/Footer";
import Header from "../components/Header";
import CardPageClient from "./components/CartPageClient";

const Checkout= () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
                <CardPageClient />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
 
export default Checkout;