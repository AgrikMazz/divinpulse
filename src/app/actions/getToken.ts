"use client";

export const getToken = async () => {
    let valid;
    let token: string | null;
    token = localStorage.getItem("SR_Token");
    if (!token) valid = false;
    //@ts-ignore
    if (token) {
        const parsedJWT = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (!parsedJWT || !parsedJWT.exp) valid = false;
        valid = parsedJWT.exp > Date.now() / 1000;
    }
    if(!valid) {
        const res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": "dushtuman1524@gmail.com",
                "password": "Aneel@15"
            }),
        });
        console.log(res);
        if (!res.ok) {
            throw new Error('Token could not be generated. Please try again.');
        }
        const data = await res.json();
        token = data.token;
        token && localStorage.setItem('SR_Token', token);
        valid = true;
    }
    console.log(token);
    return token;
};


// Middleware for refreshing the token if expired
export const checkServicibility = async (pickup_postcode: string, delivery_postcode: number, weight: string, token: string) => {
    const url = new URL("https://apiv2.shiprocket.in/v1/external/courier/serviceability/");
    url.searchParams.append("pickup_postcode", pickup_postcode.toString());
    url.searchParams.append("delivery_postcode", delivery_postcode.toString());
    url.searchParams.append("weight", weight.toString());
    url.searchParams.append("cod", "0");
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });
    const resJson = await res.json();
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return resJson;
};
