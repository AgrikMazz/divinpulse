import Markdown from "react-markdown";
import fs from 'fs';
import matter from "gray-matter";
import Poster from "../../../../public/Poster.jpg";
import Temple from "../../../../public/Temple.jpeg";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import qs from 'query-string';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import loadDocument from "@/app/actions/loadDocuments";

interface Props {
  params: {
    slug: string
  }
}

const Blog: React.FC<Props> = async ( { params } ) => {
  const blog = await loadDocument("blog.md");
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="relative flex flex-col justify-center text-center h-72 w-full">
        <img className="object-cover h-full w-full overflow-hidden" src={Poster.src} alt="banner" />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-semibold">Explore the Spiritual Essence of Pilgrimage Sites of India</h1>
      </div>
      <div className="flex flex-col items-center justify-center my-4">
        <div className="flex flex-col justify-center max-w-[800px]">
          <img className="" src={Temple.src} alt="temple" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <Markdown className="prose border p-4 flex flex-col justify-center">{blog}</Markdown>
      </div>
      <Footer />
    </div>
  );
}
 
export default Blog;