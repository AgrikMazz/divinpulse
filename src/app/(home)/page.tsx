import ContentArea from "./components/ContentArea";
import StartArea from "./components/StartArea";
import Footer from "../components/Footer";
import Header from "../components/Header";
import getAllProducts from "../actions/getAllProducts";
import Faqs from "./components/Faqs";
import getAllStores from "../actions/getAllStores";

export default async function Home() {
  const products = await getAllProducts();
  const stores = await getAllStores();

  return (
    <main className="h-full w-full items-center justify-between">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header />
          <StartArea />
          <ContentArea products={products} stores={stores} />
          <Faqs />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
