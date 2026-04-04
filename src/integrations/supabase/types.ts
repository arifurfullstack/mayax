export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      auto_pay_rules: {
        Row: {
          buyer_types: string[]
          created_at: string
          daily_budget: number
          daily_spent: number
          dealer_id: string
          id: string
          is_active: boolean
          last_reset_date: string
          leads_purchased_today: number
          max_leads_per_day: number
          max_price: number
          min_ai_score: number
          provinces: string[]
          quality_grades: string[]
          rule_name: string
          updated_at: string
        }
        Insert: {
          buyer_types?: string[]
          created_at?: string
          daily_budget?: number
          daily_spent?: number
          dealer_id: string
          id?: string
          is_active?: boolean
          last_reset_date?: string
          leads_purchased_today?: number
          max_leads_per_day?: number
          max_price?: number
          min_ai_score?: number
          provinces?: string[]
          quality_grades?: string[]
          rule_name?: string
          updated_at?: string
        }
        Update: {
          buyer_types?: string[]
          created_at?: string
          daily_budget?: number
          daily_spent?: number
          dealer_id?: string
          id?: string
          is_active?: boolean
          last_reset_date?: string
          leads_purchased_today?: number
          max_leads_per_day?: number
          max_price?: number
          min_ai_score?: number
          provinces?: string[]
          quality_grades?: string[]
          rule_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_pay_rules_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
      dealers: {
        Row: {
          approval_status: string
          avatar_url: string | null
          business_address: string | null
          business_type: string | null
          contact_person: string
          created_at: string
          dealership_name: string
          delivery_preference: string
          email: string
          id: string
          notification_email: string | null
          phone: string
          province: string | null
          rejection_reason: string | null
          subscription_tier: string
          updated_at: string
          user_id: string
          wallet_balance: number
          webhook_secret: string | null
          webhook_url: string | null
          website: string | null
        }
        Insert: {
          approval_status?: string
          avatar_url?: string | null
          business_address?: string | null
          business_type?: string | null
          contact_person: string
          created_at?: string
          dealership_name: string
          delivery_preference?: string
          email: string
          id?: string
          notification_email?: string | null
          phone: string
          province?: string | null
          rejection_reason?: string | null
          subscription_tier?: string
          updated_at?: string
          user_id: string
          wallet_balance?: number
          webhook_secret?: string | null
          webhook_url?: string | null
          website?: string | null
        }
        Update: {
          approval_status?: string
          avatar_url?: string | null
          business_address?: string | null
          business_type?: string | null
          contact_person?: string
          created_at?: string
          dealership_name?: string
          delivery_preference?: string
          email?: string
          id?: string
          notification_email?: string | null
          phone?: string
          province?: string | null
          rejection_reason?: string | null
          subscription_tier?: string
          updated_at?: string
          user_id?: string
          wallet_balance?: number
          webhook_secret?: string | null
          webhook_url?: string | null
          website?: string | null
        }
        Relationships: []
      }
      delivery_logs: {
        Row: {
          attempted_at: string
          channel: string
          endpoint: string
          error_details: string | null
          id: string
          payload_summary: string | null
          purchase_id: string
          response_code: number | null
          retry_count: number
          success: boolean
        }
        Insert: {
          attempted_at?: string
          channel: string
          endpoint: string
          error_details?: string | null
          id?: string
          payload_summary?: string | null
          purchase_id: string
          response_code?: number | null
          retry_count?: number
          success: boolean
        }
        Update: {
          attempted_at?: string
          channel?: string
          endpoint?: string
          error_details?: string | null
          id?: string
          payload_summary?: string | null
          purchase_id?: string
          response_code?: number | null
          retry_count?: number
          success?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "delivery_logs_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          ai_score: number
          approved_at: string | null
          buyer_type: string
          city: string
          created_at: string
          credit_range_max: number
          credit_range_min: number
          documents: Json | null
          full_name: string
          has_bank_statements: boolean
          has_credit_report: boolean
          has_drivers_license: boolean
          has_paystubs: boolean
          has_preapproval: boolean
          id: string
          income: number | null
          initials: string
          lead_email: string
          listed_by_id: string | null
          listed_by_role: string | null
          phone: string
          price: number
          provider_payout_amount: number | null
          provider_payout_status: string | null
          province: string
          purchased_by_dealer_id: string | null
          quality_grade: string
          reference_code: string
          review_notes: string | null
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          sold_at: string | null
          sold_status: string
          vehicle_preference: string | null
          view_count: number
        }
        Insert: {
          ai_score: number
          approved_at?: string | null
          buyer_type: string
          city: string
          created_at?: string
          credit_range_max: number
          credit_range_min: number
          documents?: Json | null
          full_name: string
          has_bank_statements?: boolean
          has_credit_report?: boolean
          has_drivers_license?: boolean
          has_paystubs?: boolean
          has_preapproval?: boolean
          id?: string
          income?: number | null
          initials: string
          lead_email: string
          listed_by_id?: string | null
          listed_by_role?: string | null
          phone: string
          price: number
          provider_payout_amount?: number | null
          provider_payout_status?: string | null
          province: string
          purchased_by_dealer_id?: string | null
          quality_grade: string
          reference_code: string
          review_notes?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sold_at?: string | null
          sold_status?: string
          vehicle_preference?: string | null
          view_count?: number
        }
        Update: {
          ai_score?: number
          approved_at?: string | null
          buyer_type?: string
          city?: string
          created_at?: string
          credit_range_max?: number
          credit_range_min?: number
          documents?: Json | null
          full_name?: string
          has_bank_statements?: boolean
          has_credit_report?: boolean
          has_drivers_license?: boolean
          has_paystubs?: boolean
          has_preapproval?: boolean
          id?: string
          income?: number | null
          initials?: string
          lead_email?: string
          listed_by_id?: string | null
          listed_by_role?: string | null
          phone?: string
          price?: number
          provider_payout_amount?: number | null
          provider_payout_status?: string | null
          province?: string
          purchased_by_dealer_id?: string | null
          quality_grade?: string
          reference_code?: string
          review_notes?: string | null
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          sold_at?: string | null
          sold_status?: string
          vehicle_preference?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "leads_purchased_by_dealer_id_fkey"
            columns: ["purchased_by_dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
      normal_user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          notification_email: string | null
          phone: string | null
          updated_at: string
          wallet_balance: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          notification_email?: string | null
          phone?: string | null
          updated_at?: string
          wallet_balance?: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          notification_email?: string | null
          phone?: string | null
          updated_at?: string
          wallet_balance?: number
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          updated_by: string | null
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string
        }
        Relationships: []
      }
      provider_payouts: {
        Row: {
          amount: number
          id: string
          leads_count: number
          notes: string | null
          processed_at: string | null
          processed_by: string | null
          provider_id: string
          requested_at: string
          status: string
        }
        Insert: {
          amount: number
          id?: string
          leads_count?: number
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          provider_id: string
          requested_at?: string
          status?: string
        }
        Update: {
          amount?: number
          id?: string
          leads_count?: number
          notes?: string | null
          processed_at?: string | null
          processed_by?: string | null
          provider_id?: string
          requested_at?: string
          status?: string
        }
        Relationships: []
      }
      provider_profiles: {
        Row: {
          approval_status: string
          avatar_url: string | null
          business_address: string | null
          commission_rate: number
          company_name: string
          contact_person: string
          created_at: string
          email: string
          id: string
          lead_source_description: string | null
          payout_method: string | null
          pending_payout: number
          phone: string | null
          rejection_reason: string | null
          total_earnings: number
          updated_at: string
          website: string | null
        }
        Insert: {
          approval_status?: string
          avatar_url?: string | null
          business_address?: string | null
          commission_rate?: number
          company_name: string
          contact_person: string
          created_at?: string
          email: string
          id: string
          lead_source_description?: string | null
          payout_method?: string | null
          pending_payout?: number
          phone?: string | null
          rejection_reason?: string | null
          total_earnings?: number
          updated_at?: string
          website?: string | null
        }
        Update: {
          approval_status?: string
          avatar_url?: string | null
          business_address?: string | null
          commission_rate?: number
          company_name?: string
          contact_person?: string
          created_at?: string
          email?: string
          id?: string
          lead_source_description?: string | null
          payout_method?: string | null
          pending_payout?: number
          phone?: string | null
          rejection_reason?: string | null
          total_earnings?: number
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          buyer_type: string | null
          buyer_user_id: string | null
          dealer_id: string
          dealer_tier_at_purchase: string
          delivery_method: string
          delivery_status: string
          id: string
          lead_id: string
          price_paid: number
          purchased_at: string
        }
        Insert: {
          buyer_type?: string | null
          buyer_user_id?: string | null
          dealer_id: string
          dealer_tier_at_purchase: string
          delivery_method: string
          delivery_status?: string
          id?: string
          lead_id: string
          price_paid: number
          purchased_at?: string
        }
        Update: {
          buyer_type?: string | null
          buyer_user_id?: string | null
          dealer_id?: string
          dealer_tier_at_purchase?: string
          delivery_method?: string
          delivery_status?: string
          id?: string
          lead_id?: string
          price_paid?: number
          purchased_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads_public"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          auto_renew: boolean
          billing_cycle: string
          created_at: string
          dealer_id: string
          end_date: string | null
          id: string
          price_monthly: number
          start_date: string
          status: string
          stripe_subscription_id: string | null
          tier: string
        }
        Insert: {
          auto_renew?: boolean
          billing_cycle?: string
          created_at?: string
          dealer_id: string
          end_date?: string | null
          id?: string
          price_monthly: number
          start_date?: string
          status: string
          stripe_subscription_id?: string | null
          tier: string
        }
        Update: {
          auto_renew?: boolean
          billing_cycle?: string
          created_at?: string
          dealer_id?: string
          end_date?: string | null
          id?: string
          price_monthly?: number
          start_date?: string
          status?: string
          stripe_subscription_id?: string | null
          tier?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          balance_after: number
          buyer_type: string | null
          buyer_user_id: string | null
          created_at: string
          created_by: string | null
          dealer_id: string
          description: string
          id: string
          reference_id: string | null
          type: string
        }
        Insert: {
          amount: number
          balance_after: number
          buyer_type?: string | null
          buyer_user_id?: string | null
          created_at?: string
          created_by?: string | null
          dealer_id: string
          description: string
          id?: string
          reference_id?: string | null
          type: string
        }
        Update: {
          amount?: number
          balance_after?: number
          buyer_type?: string | null
          buyer_user_id?: string | null
          created_at?: string
          created_by?: string | null
          dealer_id?: string
          description?: string
          id?: string
          reference_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_dealer_id_fkey"
            columns: ["dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leads_public: {
        Row: {
          ai_score: number | null
          approved_at: string | null
          buyer_type: string | null
          city: string | null
          created_at: string | null
          credit_range_max: number | null
          credit_range_min: number | null
          has_bank_statements: boolean | null
          has_credit_report: boolean | null
          has_drivers_license: boolean | null
          has_paystubs: boolean | null
          has_preapproval: boolean | null
          id: string | null
          income: number | null
          initials: string | null
          listed_by_role: string | null
          price: number | null
          province: string | null
          purchased_by_dealer_id: string | null
          quality_grade: string | null
          reference_code: string | null
          review_status: string | null
          sold_at: string | null
          sold_status: string | null
          vehicle_preference: string | null
          view_count: number | null
        }
        Insert: {
          ai_score?: number | null
          approved_at?: string | null
          buyer_type?: string | null
          city?: string | null
          created_at?: string | null
          credit_range_max?: number | null
          credit_range_min?: number | null
          has_bank_statements?: boolean | null
          has_credit_report?: boolean | null
          has_drivers_license?: boolean | null
          has_paystubs?: boolean | null
          has_preapproval?: boolean | null
          id?: string | null
          income?: number | null
          initials?: string | null
          listed_by_role?: string | null
          price?: number | null
          province?: string | null
          purchased_by_dealer_id?: string | null
          quality_grade?: string | null
          reference_code?: string | null
          review_status?: string | null
          sold_at?: string | null
          sold_status?: string | null
          vehicle_preference?: string | null
          view_count?: number | null
        }
        Update: {
          ai_score?: number | null
          approved_at?: string | null
          buyer_type?: string | null
          city?: string | null
          created_at?: string | null
          credit_range_max?: number | null
          credit_range_min?: number | null
          has_bank_statements?: boolean | null
          has_credit_report?: boolean | null
          has_drivers_license?: boolean | null
          has_paystubs?: boolean | null
          has_preapproval?: boolean | null
          id?: string | null
          income?: number | null
          initials?: string | null
          listed_by_role?: string | null
          price?: number | null
          province?: string | null
          purchased_by_dealer_id?: string | null
          quality_grade?: string | null
          reference_code?: string | null
          review_status?: string | null
          sold_at?: string | null
          sold_status?: string | null
          vehicle_preference?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_purchased_by_dealer_id_fkey"
            columns: ["purchased_by_dealer_id"]
            isOneToOne: false
            referencedRelation: "dealers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      purchase_lead: {
        Args: {
          _dealer_id: string
          _delivery_method: string
          _lead_id: string
          _price: number
          _tier: string
        }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "dealer" | "normal_user" | "provider"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "dealer", "normal_user", "provider"],
    },
  },
} as const
