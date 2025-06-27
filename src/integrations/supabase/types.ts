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
      premium_features: {
        Row: {
          expires_at: string | null
          feature_type: string
          id: string
          swap_id: string | null
          used_at: string
          user_id: string | null
        }
        Insert: {
          expires_at?: string | null
          feature_type: string
          id?: string
          swap_id?: string | null
          used_at?: string
          user_id?: string | null
        }
        Update: {
          expires_at?: string | null
          feature_type?: string
          id?: string
          swap_id?: string | null
          used_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          additional_info: string | null
          apartment_description: string | null
          budget: string | null
          created_at: string
          current_address: string | null
          current_location: string | null
          email: string
          end_date: string | null
          exchange_university: string | null
          full_name: string | null
          gdpr_consent: boolean | null
          has_uploaded_proof: boolean | null
          id: string
          preferred_destinations: string[] | null
          program: string | null
          start_date: string | null
          university: string | null
          university_email: string | null
          updated_at: string
          user_id: string | null
          verification_method: string | null
          verification_status: string | null
        }
        Insert: {
          additional_info?: string | null
          apartment_description?: string | null
          budget?: string | null
          created_at?: string
          current_address?: string | null
          current_location?: string | null
          email: string
          end_date?: string | null
          exchange_university?: string | null
          full_name?: string | null
          gdpr_consent?: boolean | null
          has_uploaded_proof?: boolean | null
          id?: string
          preferred_destinations?: string[] | null
          program?: string | null
          start_date?: string | null
          university?: string | null
          university_email?: string | null
          updated_at?: string
          user_id?: string | null
          verification_method?: string | null
          verification_status?: string | null
        }
        Update: {
          additional_info?: string | null
          apartment_description?: string | null
          budget?: string | null
          created_at?: string
          current_address?: string | null
          current_location?: string | null
          email?: string
          end_date?: string | null
          exchange_university?: string | null
          full_name?: string | null
          gdpr_consent?: boolean | null
          has_uploaded_proof?: boolean | null
          id?: string
          preferred_destinations?: string[] | null
          program?: string | null
          start_date?: string | null
          university?: string | null
          university_email?: string | null
          updated_at?: string
          user_id?: string | null
          verification_method?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: "free" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_tier: ["free", "premium"],
    },
  },
} as const
