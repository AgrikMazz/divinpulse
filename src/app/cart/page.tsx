import Footer from "../components/Footer";
import Header from "../components/Header";
import CartPageClient from "./components/CartPageClient";

interface CartPageProps {
    params: {
        productId: string
    }
}

const CartPage: React.FC<CartPageProps> = async ({ params }) => {
    return(
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
                <CartPageClient />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}
 
export default CartPage;