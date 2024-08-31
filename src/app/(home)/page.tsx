import ContentArea from "./components/ContentArea";
import StartArea from "./components/StartArea";
import Footer from "../components/Footer";
import Header from "../components/Header";
import getAllProducts from "../actions/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="h-full w-full bg-gray-200 items-center justify-between">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header />
          <StartArea />
          <ContentArea products={products} />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
