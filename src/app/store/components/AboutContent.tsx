import Markdown from "react-markdown";
import fs from 'fs';
import matter from "gray-matter";
import mammoth from "mammoth";
import { Store } from "@/types/types";
import loadStoreAbout from "@/app/actions/loadStoreAbout";
import loadStoreImages from "@/app/actions/loadStoreImages";
import Footer from "@/app/components/Footer";

interface Props {
    store: Store
}

const AboutContent: React.FC<Props> = async({ store }) => {
  const About = await loadStoreAbout(store);
  let Text;
  if (About) {
    Text = await About.text();
  }
  const storeImages = loadStoreImages(store);
    
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center my-4">
        {storeImages.storePublicUrls.map((url) => <div className="flex flex-col justify-center max-w-[800px]">
          <img className="" src={url} alt="temple" />
        </div>)}
      </div>
        {Text ? <div className="flex flex-col items-center justify-center p-4">
          <Markdown className="prose border p-4 flex flex-col justify-center">{Text}</Markdown>
        </div> : 
        <div>
          Welcome to DivinePulse
        </div>}
    </div>
  );
}

  export default AboutContent;