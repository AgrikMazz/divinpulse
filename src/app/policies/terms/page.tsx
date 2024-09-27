import Markdown from "react-markdown";
import fs from 'fs';
import matter from "gray-matter";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const Terms = () => {
  const filePath = "public\\policies\\Terms.md";
  const content = fs.readFileSync(filePath, 'utf8');
  const post = matter(content);

  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="flex flex-col items-center justify-center p-4">
        <Markdown className="prose border p-4 flex flex-col justify-center">{post.content}</Markdown>
      </div>
      <Footer />
    </div>
  );
}
 
export default Terms;