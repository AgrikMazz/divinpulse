import Footer from "@/components/Footer";
import Image from "next/image";
import TopPicks from "./components/TopPicks";
import SearchPilgrim from "./components/SearchPilgrim";
import StartArea from "./components/StartArea";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="h-full w-full bg-gray-200 items-center justify-between">
      <Header />
      <StartArea />
      <SearchPilgrim />
      <TopPicks />
      <Footer />
    </main>
  );
}
