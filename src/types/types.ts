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
    subcategory_id: number;
    stars: number;
    stores: {
        id: string;
        name: string
    }
}

export interface Store {
    id: string;
    name: string;
    label: string;
    imageUrl: string;
    userId: string;
    active: string;
}

export interface Category {
    id: number,
    name: string
}

export interface SubCategory {
    id: number,
    name: string,
    parent_cat_id: number
}

export interface Image {
    id: number,
    imageUrls: string[]
}