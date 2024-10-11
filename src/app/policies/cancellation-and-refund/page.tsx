import Markdown from "react-markdown";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import loadDocument from "@/app/actions/loadDocuments";

const Cancellation_And_Refunds = async () => {
  const Text = await loadDocument("cancellation-and-refunds.md");
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="flex flex-col items-center justify-center p-4">
        <Markdown className="prose border p-4 flex flex-col justify-center">{Text}</Markdown>
      </div>
      <Footer />
    </div>
  );
}
 
export default Cancellation_And_Refunds;
