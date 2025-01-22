import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface Props {
    userid: string,
    first_name: string,
    last_name: string,
}

const syncAuthData = async (
    userid: string,
    first_name: string,
    last_name: string,
    email: string
) => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.from("users").upsert([
        {
            id: userid,
            first_name: first_name,
            last_name: last_name,
            email: email
        },
    ]).select('*');

    if (error) {
        console.log(error);
        return null;
    }

    return data;
};

export default syncAuthData;