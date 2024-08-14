import TopPicks from "./components/TopPicks";
import SearchPilgrim from "./components/SearchPilgrim";
import StartArea from "./components/StartArea";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="h-full w-full bg-gray-200 items-center justify-between">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header />
          <StartArea />
          <SearchPilgrim />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </main>
  );
}
