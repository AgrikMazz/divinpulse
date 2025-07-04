export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          id: number
          postalCode: number | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          id?: number
          postalCode?: number | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          id?: number
          postalCode?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          cat_name: string
          id: number
        }
        Insert: {
          cat_name: string
          id?: number
        }
        Update: {
          cat_name?: string
          id?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          order_id: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          order_id?: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          order_id?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: number
          metadata: Json | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id: number
          metadata?: Json | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          metadata?: Json | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          category_id: number | null
          created_at: string | null
          description: string | null
          id: string
          imageUrl: string | null
          name: string | null
          price: number | null
          store_id: number | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id: string
          imageUrl?: string | null
          name?: string | null
          price?: number | null
          store_id?: number | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          category_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          imageUrl?: string | null
          name?: string | null
          price?: number | null
          store_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          about: string | null
          addressId: number | null
          created_at: string
          id: number
          imageUrl: string | null
          label: string | null
          name: string | null
          userId: string | null
        }
        Insert: {
          about?: string | null
          addressId?: number | null
          created_at?: string
          id?: number
          imageUrl?: string | null
          label?: string | null
          name?: string | null
          userId?: string | null
        }
        Update: {
          about?: string | null
          addressId?: number | null
          created_at?: string
          id?: number
          imageUrl?: string | null
          label?: string | null
          name?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_addressId_fkey"
            columns: ["addressId"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

