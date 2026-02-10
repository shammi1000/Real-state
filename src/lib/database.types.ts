export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          price_period: string | null;
          property_type: string;
          listing_type: string;
          bedrooms: number;
          bathrooms: number;
          square_feet: number;
          address: string;
          city: string;
          state: string | null;
          country: string;
          latitude: number | null;
          longitude: number | null;
          images: string[];
          featured: boolean;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price: number;
          price_period?: string | null;
          property_type?: string;
          listing_type?: string;
          bedrooms?: number;
          bathrooms?: number;
          square_feet?: number;
          address: string;
          city: string;
          state?: string | null;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          images?: string[];
          featured?: boolean;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          price_period?: string | null;
          property_type?: string;
          listing_type?: string;
          bedrooms?: number;
          bathrooms?: number;
          square_feet?: number;
          address?: string;
          city?: string;
          state?: string | null;
          country?: string;
          latitude?: number | null;
          longitude?: number | null;
          images?: string[];
          featured?: boolean;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_properties: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          created_at?: string;
        };
      };
      viewed_properties: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          viewed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          viewed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          viewed_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          message?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

export type Property = Database['public']['Tables']['properties']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type SavedProperty = Database['public']['Tables']['saved_properties']['Row'];
