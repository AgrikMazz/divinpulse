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
    id: string;
    active: string;
    name: string;
    description: string;
    imageUrl: string;
    store_id: number;
    created_at: string;
    category_id: string;
    user_id: string;
    price: number;
}