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
      admin_actions: {
        Row: {
          action: string | null
          admin_id: number | null
          id: number
          target_id: number | null
          timestamp: string | null
        }
        Insert: {
          action?: string | null
          admin_id?: number | null
          id?: number
          target_id?: number | null
          timestamp?: string | null
        }
        Update: {
          action?: string | null
          admin_id?: number | null
          id?: number
          target_id?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_actions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      design_fulfillment: {
        Row: {
          compatibility: string | null
          design_id: number | null
          id: number
          maker_id: number | null
        }
        Insert: {
          compatibility?: string | null
          design_id?: number | null
          id?: number
          maker_id?: number | null
        }
        Update: {
          compatibility?: string | null
          design_id?: number | null
          id?: number
          maker_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "design_fulfillment_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_fulfillment_maker_id_fkey"
            columns: ["maker_id"]
            isOneToOne: false
            referencedRelation: "makers"
            referencedColumns: ["id"]
          },
        ]
      }
      design_status_history: {
        Row: {
          changed_by: number | null
          design_id: number | null
          id: number
          status: string | null
          timestamp: string | null
        }
        Insert: {
          changed_by?: number | null
          design_id?: number | null
          id?: number
          status?: string | null
          timestamp?: string | null
        }
        Update: {
          changed_by?: number | null
          design_id?: number | null
          id?: number
          status?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "design_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_status_history_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      designs: {
        Row: {
          additional_components: Json | null
          created_at: string | null
          creator_id: number | null
          description: string | null
          external_components: Json | null
          gcode_files: Json | null
          id: number
          images: Json | null
          instructions: string | null
          model_files: Json | null
          royalties: number | null
          status: string | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string | null
          videos: Json | null
          views: number | null
        }
        Insert: {
          additional_components?: Json | null
          created_at?: string | null
          creator_id?: number | null
          description?: string | null
          external_components?: Json | null
          gcode_files?: Json | null
          id?: number
          images?: Json | null
          instructions?: string | null
          model_files?: Json | null
          royalties?: number | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          videos?: Json | null
          views?: number | null
        }
        Update: {
          additional_components?: Json | null
          created_at?: string | null
          creator_id?: number | null
          description?: string | null
          external_components?: Json | null
          gcode_files?: Json | null
          id?: number
          images?: Json | null
          instructions?: string | null
          model_files?: Json | null
          royalties?: number | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string | null
          videos?: Json | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "designs_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          created_at: string | null
          id: number
          last_maintenance: string | null
          manufacturer: string | null
          manufacturer_url: string | null
          model: string | null
          next_maintenance: string | null
          specs: Json | null
          status: string | null
          sub_type: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_maintenance?: string | null
          manufacturer?: string | null
          manufacturer_url?: string | null
          model?: string | null
          next_maintenance?: string | null
          specs?: Json | null
          status?: string | null
          sub_type?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          last_maintenance?: string | null
          manufacturer?: string | null
          manufacturer_url?: string | null
          model?: string | null
          next_maintenance?: string | null
          specs?: Json | null
          status?: string | null
          sub_type?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      equipment_library: {
        Row: {
          added_by: string | null
          features: string | null
          id: number
          last_updated: string | null
          manufacturer: string | null
          model: string | null
          specifications: string | null
          supported_materials: string | null
          type: string | null
        }
        Insert: {
          added_by?: string | null
          features?: string | null
          id?: number
          last_updated?: string | null
          manufacturer?: string | null
          model?: string | null
          specifications?: string | null
          supported_materials?: string | null
          type?: string | null
        }
        Update: {
          added_by?: string | null
          features?: string | null
          id?: number
          last_updated?: string | null
          manufacturer?: string | null
          model?: string | null
          specifications?: string | null
          supported_materials?: string | null
          type?: string | null
        }
        Relationships: []
      }
      equipment_updates: {
        Row: {
          equipment_id: number | null
          id: number
          timestamp: string | null
          update_description: string | null
          updated_by: number | null
        }
        Insert: {
          equipment_id?: number | null
          id?: number
          timestamp?: string | null
          update_description?: string | null
          updated_by?: number | null
        }
        Update: {
          equipment_id?: number | null
          id?: number
          timestamp?: string | null
          update_description?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_updates_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_updates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      makers: {
        Row: {
          availability: boolean | null
          completed_orders: number | null
          id: number
          location: string | null
          rating: number | null
          user_id: number | null
        }
        Insert: {
          availability?: boolean | null
          completed_orders?: number | null
          id?: number
          location?: string | null
          rating?: number | null
          user_id?: number | null
        }
        Update: {
          availability?: boolean | null
          completed_orders?: number | null
          id?: number
          location?: string | null
          rating?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "makers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      makers_materials: {
        Row: {
          experience_level: string | null
          id: number
          maker_id: number | null
          material_id: number | null
        }
        Insert: {
          experience_level?: string | null
          id?: number
          maker_id?: number | null
          material_id?: number | null
        }
        Update: {
          experience_level?: string | null
          id?: number
          maker_id?: number | null
          material_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "makers_materials_maker_id_fkey"
            columns: ["maker_id"]
            isOneToOne: false
            referencedRelation: "makers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "makers_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      material_equipment: {
        Row: {
          equipment_id: number | null
          id: number
          material_id: number | null
        }
        Insert: {
          equipment_id?: number | null
          id?: number
          material_id?: number | null
        }
        Update: {
          equipment_id?: number | null
          id?: number
          material_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "material_equipment_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_equipment_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          color: string | null
          id: number
          manufacturer: string | null
          price: number | null
          quantity: number | null
          reorder_point: number | null
          type: string | null
          unit: string | null
          vendor_name: string | null
          vendor_url: string | null
        }
        Insert: {
          color?: string | null
          id?: number
          manufacturer?: string | null
          price?: number | null
          quantity?: number | null
          reorder_point?: number | null
          type?: string | null
          unit?: string | null
          vendor_name?: string | null
          vendor_url?: string | null
        }
        Update: {
          color?: string | null
          id?: number
          manufacturer?: string | null
          price?: number | null
          quantity?: number | null
          reorder_point?: number | null
          type?: string | null
          unit?: string | null
          vendor_name?: string | null
          vendor_url?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          read_status: boolean | null
          type: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          read_status?: boolean | null
          type?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          read_status?: boolean | null
          type?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: number | null
          customization: string | null
          design_id: number | null
          due_date: string | null
          id: number
          maker_id: number | null
          price: number | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: number | null
          customization?: string | null
          design_id?: number | null
          due_date?: string | null
          id?: number
          maker_id?: number | null
          price?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: number | null
          customization?: string | null
          design_id?: number | null
          due_date?: string | null
          id?: number
          maker_id?: number | null
          price?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_maker_id_fkey"
            columns: ["maker_id"]
            isOneToOne: false
            referencedRelation: "makers"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number | null
          created_at: string | null
          id: number
          order_id: number | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: number
          order_id?: number | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: number
          order_id?: number | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string | null
          id: number
          role_id: number | null
        }
        Insert: {
          action?: string | null
          id?: number
          role_id?: number | null
        }
        Update: {
          action?: string | null
          id?: number
          role_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          reference_id: number | null
          review_type: string | null
          reviewer_id: number | null
          score: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          reference_id?: number | null
          review_type?: string | null
          reviewer_id?: number | null
          score?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          reference_id?: number | null
          review_type?: string | null
          reviewer_id?: number | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          id: number
          role_name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          role_name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          role_name?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          attachmentURLs: Json | null
          created_at: string | null
          description: string | null
          id: number
          materialCost: number | null
          paymentStatus: string | null
          status: string | null
          timeCost: number | null
          transactionId: string | null
          updated_at: string | null
          userInfo: Json | null
        }
        Insert: {
          attachmentURLs?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          materialCost?: number | null
          paymentStatus?: string | null
          status?: string | null
          timeCost?: number | null
          transactionId?: string | null
          updated_at?: string | null
          userInfo?: Json | null
        }
        Update: {
          attachmentURLs?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          materialCost?: number | null
          paymentStatus?: string | null
          status?: string | null
          timeCost?: number | null
          transactionId?: string | null
          updated_at?: string | null
          userInfo?: Json | null
        }
        Relationships: []
      }
      units: {
        Row: {
          id: number
          unit_name: string | null
          unit_symbol: string | null
        }
        Insert: {
          id?: number
          unit_name?: string | null
          unit_symbol?: string | null
        }
        Update: {
          id?: number
          unit_name?: string | null
          unit_symbol?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_by: number | null
          created_at: string | null
          id: number
          role_id: number | null
          user_id: number | null
        }
        Insert: {
          assigned_by?: number | null
          created_at?: string | null
          id?: number
          role_id?: number | null
          user_id?: number | null
        }
        Update: {
          assigned_by?: number | null
          created_at?: string | null
          id?: number
          role_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          phone: string | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
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
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
