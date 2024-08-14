export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    email?: string;
    phone?: string;
}

export interface Product {
    id: number;
    active: string;
    name: string;
    description: string;
    imageUrl: string[];
    store_id: number;
    created_at: string;
    category_id: number;
    user_id: string;
    price: number;
    stars: number;
    stores: {
        id: number;
        name: string
    }
}

export interface Store {
    id: string;
    name: string;
    userId: string;
    label: string;
    iconUrl: string;
    about: string;
    active: string;
    bannerUrl: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    postalCode: number;
}

export interface Category {
    id: number,
    name: string
}

export interface Image {
    id: number,
    imageUrls: string[]
}