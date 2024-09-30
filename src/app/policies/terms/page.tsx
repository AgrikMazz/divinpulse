import Markdown from "react-markdown";
import fs from 'fs';
import matter from "gray-matter";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Terms = async () => {
  const supabase = createClientComponentClient();
  const { data: termData, error: termError } = await supabase.storage.from("documents").download("Terms.md");
  if (termError) {
      console.log(termError);
      return null;
  }
  let Text;
  if (termData) {
    Text = await termData.text();
  }

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
 
export default Terms;