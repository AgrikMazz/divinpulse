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
    rating: number;
    number_of_ratings: number;
    number_of_reviews: number;
    total_sold: number;
    stores: {
        id: number;
        name: string
    };
    categories: {
        id: number;
        path: string
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
    storeImageUrls: string[];
    storeAbout: string;
}

export interface Category {
    id: number,
    name: string
}

export interface Image {
    id: number,
    imageUrls: string[]
}

export interface Review {
    id: number,
    product_id: number,
    user_id: string,
    rating: number,
    review: string,
    username: string,
    created_at: string
}