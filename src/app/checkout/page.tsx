import { auth, clerkClient } from "@clerk/nextjs/server";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CheckoutPageClient from "./components/CheckoutPageClient";
import { redirect } from "next/navigation";
import useCart from "@/hooks/useCart";

interface CartPageProps {
    params: {
        productId: string
    }
}

const CartPage: React.FC<CartPageProps> = async ({ params }) => {
    const { userId } = auth();
    if (!userId) { redirect("/sign-in"); }
    const user = await clerkClient.users.getUser(userId);

    return(
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Header />
                <CheckoutPageClient first_name={user?.firstName} last_name={user?.lastName} email={user?.emailAddresses[0]?.emailAddress} phone={user?.phoneNumbers[0]?.phoneNumber} userId={userId} />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}
 
export default CartPage;