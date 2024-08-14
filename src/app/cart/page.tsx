import CartPageClient from "./components/CartPageClient";

interface CartPageProps {
    params: {
        productId: string
    }
}

const CartPage: React.FC<CartPageProps> = async ({ params }) => {
    return(
        <div>
            <CartPageClient />
        </div>
    )
}
 
export default CartPage;