import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const loadDocument = async (filename: string) => {
    const supabase = createClientComponentClient();
    const { data: docData, error: docError } = await supabase.storage.from("documents").download(filename);
    if (docError) {
        console.log(docError);
        return null;
    }
    return docData.text();
}

export default loadDocument;