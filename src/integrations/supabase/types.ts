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
          admin_id: string | null
          id: number
          target_id: number | null
          timestamp: string | null
        }
        Insert: {
          action?: string | null
          admin_id?: string | null
          id?: number
          target_id?: number | null
          timestamp?: string | null
        }
        Update: {
          action?: string | null
          admin_id?: string | null
          id?: number
          target_id?: number | null
          timestamp?: string | null
        }
        Relationships: []
      }
      competitions: {
        Row: {
          contract_amount: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: number
          reward_details: string | null
          reward_type: Database["public"]["Enums"]["competition_reward_enum"]
          start_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          contract_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          reward_details?: string | null
          reward_type: Database["public"]["Enums"]["competition_reward_enum"]
          start_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          contract_amount?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          reward_details?: string | null
          reward_type?: Database["public"]["Enums"]["competition_reward_enum"]
          start_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      design_fulfillment: {
        Row: {
          compatibility: string | null
          customer_id: string | null
          design_id: number | null
          id: number
          maker_id: number | null
        }
        Insert: {
          compatibility?: string | null
          customer_id?: string | null
          design_id?: number | null
          id?: number
          maker_id?: number | null
        }
        Update: {
          compatibility?: string | null
          customer_id?: string | null
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
      design_ownership_history: {
        Row: {
          competition_id: number | null
          design_id: number
          id: number
          new_owner_id: string | null
          old_owner_id: string | null
          reason: string | null
          transferred_at: string | null
        }
        Insert: {
          competition_id?: number | null
          design_id: number
          id?: number
          new_owner_id?: string | null
          old_owner_id?: string | null
          reason?: string | null
          transferred_at?: string | null
        }
        Update: {
          competition_id?: number | null
          design_id?: number
          id?: number
          new_owner_id?: string | null
          old_owner_id?: string | null
          reason?: string | null
          transferred_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ownership_history_competition"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ownership_history_design"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      design_status_history: {
        Row: {
          changed_by: string | null
          design_id: number | null
          id: number
          status: Database["public"]["Enums"]["design_status_enum"] | null
          timestamp: string | null
        }
        Insert: {
          changed_by?: string | null
          design_id?: number | null
          id?: number
          status?: Database["public"]["Enums"]["design_status_enum"] | null
          timestamp?: string | null
        }
        Update: {
          changed_by?: string | null
          design_id?: number | null
          id?: number
          status?: Database["public"]["Enums"]["design_status_enum"] | null
          timestamp?: string | null
        }
        Relationships: [
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
          average_machine_time: number
          created_at: string
          creator_id: string | null
          current_owner_id: string | null
          description: string | null
          equipment_requirements: Json | null
          estimated_machine_time: number
          external_components: Json | null
          gcode_files: Json | null
          id: number
          images: Json | null
          instructions: string | null
          material_requirements: Json | null
          model_files: Json | null
          royalties: number | null
          status: Database["public"]["Enums"]["design_status_enum"] | null
          thumbnail_url: string | null
          title: string | null
          updated_at: string
          videos: Json | null
          views: number | null
        }
        Insert: {
          additional_components?: Json | null
          average_machine_time?: number
          created_at: string
          creator_id?: string | null
          current_owner_id?: string | null
          description?: string | null
          equipment_requirements?: Json | null
          estimated_machine_time: number
          external_components?: Json | null
          gcode_files?: Json | null
          id?: number
          images?: Json | null
          instructions?: string | null
          material_requirements?: Json | null
          model_files?: Json | null
          royalties?: number | null
          status?: Database["public"]["Enums"]["design_status_enum"] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at: string
          videos?: Json | null
          views?: number | null
        }
        Update: {
          additional_components?: Json | null
          average_machine_time?: number
          created_at?: string
          creator_id?: string | null
          current_owner_id?: string | null
          description?: string | null
          equipment_requirements?: Json | null
          estimated_machine_time?: number
          external_components?: Json | null
          gcode_files?: Json | null
          id?: number
          images?: Json | null
          instructions?: string | null
          material_requirements?: Json | null
          model_files?: Json | null
          royalties?: number | null
          status?: Database["public"]["Enums"]["design_status_enum"] | null
          thumbnail_url?: string | null
          title?: string | null
          updated_at?: string
          videos?: Json | null
          views?: number | null
        }
        Relationships: []
      }
      equipment: {
        Row: {
          avg_hours_per_make: number
          avg_revenue_per_make: number
          build_volume_unit: number
          build_volume_x: number
          build_volume_y: number
          build_volume_z: number
          created_at: string
          designs_used: Json
          equipment_library_id: number | null
          hours_sum: number
          hours_used: number
          id: number
          last_maintenance: string | null
          makes_count: number
          manufacturer: string | null
          manufacturer_url: string | null
          model: string | null
          next_maintenance: string | null
          photo_url: string | null
          purchase_price: number
          revenue_sum: number
          specs: Json
          specs_template_id: number | null
          status: Database["public"]["Enums"]["equipment_status_enum"]
          sub_type: Database["public"]["Enums"]["equipment_sub_type_enum"]
          type: Database["public"]["Enums"]["equipment_type_enum"]
          updated_at: string
        }
        Insert: {
          avg_hours_per_make?: number
          avg_revenue_per_make?: number
          build_volume_unit: number
          build_volume_x: number
          build_volume_y: number
          build_volume_z: number
          created_at?: string
          designs_used?: Json
          equipment_library_id?: number | null
          hours_sum?: number
          hours_used?: number
          id?: number
          last_maintenance?: string | null
          makes_count?: number
          manufacturer?: string | null
          manufacturer_url?: string | null
          model?: string | null
          next_maintenance?: string | null
          photo_url?: string | null
          purchase_price?: number
          revenue_sum?: number
          specs: Json
          specs_template_id?: number | null
          status?: Database["public"]["Enums"]["equipment_status_enum"]
          sub_type: Database["public"]["Enums"]["equipment_sub_type_enum"]
          type: Database["public"]["Enums"]["equipment_type_enum"]
          updated_at?: string
        }
        Update: {
          avg_hours_per_make?: number
          avg_revenue_per_make?: number
          build_volume_unit?: number
          build_volume_x?: number
          build_volume_y?: number
          build_volume_z?: number
          created_at?: string
          designs_used?: Json
          equipment_library_id?: number | null
          hours_sum?: number
          hours_used?: number
          id?: number
          last_maintenance?: string | null
          makes_count?: number
          manufacturer?: string | null
          manufacturer_url?: string | null
          model?: string | null
          next_maintenance?: string | null
          photo_url?: string | null
          purchase_price?: number
          revenue_sum?: number
          specs?: Json
          specs_template_id?: number | null
          status?: Database["public"]["Enums"]["equipment_status_enum"]
          sub_type?: Database["public"]["Enums"]["equipment_sub_type_enum"]
          type?: Database["public"]["Enums"]["equipment_type_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_specs_template_id_fkey"
            columns: ["specs_template_id"]
            isOneToOne: false
            referencedRelation: "equipment_specifications_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_equipment_build_volume_unit"
            columns: ["build_volume_unit"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_equipment_library"
            columns: ["equipment_library_id"]
            isOneToOne: false
            referencedRelation: "equipment_library"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_library: {
        Row: {
          added_by: number | null
          avg_hours_per_make: number
          avg_revenue_per_make: number
          features: Json | null
          hours_sum: number
          id: number
          last_updated: string | null
          makes_count: number
          manufacturer: string | null
          model: string | null
          revenue_sum: number
          specifications: Json | null
          supported_materials: Json | null
          type: string | null
        }
        Insert: {
          added_by?: number | null
          avg_hours_per_make?: number
          avg_revenue_per_make?: number
          features?: Json | null
          hours_sum?: number
          id?: number
          last_updated?: string | null
          makes_count?: number
          manufacturer?: string | null
          model?: string | null
          revenue_sum?: number
          specifications?: Json | null
          supported_materials?: Json | null
          type?: string | null
        }
        Update: {
          added_by?: number | null
          avg_hours_per_make?: number
          avg_revenue_per_make?: number
          features?: Json | null
          hours_sum?: number
          id?: number
          last_updated?: string | null
          makes_count?: number
          manufacturer?: string | null
          model?: string | null
          revenue_sum?: number
          specifications?: Json | null
          supported_materials?: Json | null
          type?: string | null
        }
        Relationships: []
      }
      equipment_specifications_templates: {
        Row: {
          created_at: string | null
          fields: Json
          id: number
          machine_type: string
          sub_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          fields: Json
          id?: number
          machine_type: string
          sub_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          fields?: Json
          id?: number
          machine_type?: string
          sub_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      equipment_updates: {
        Row: {
          equipment_id: number | null
          id: number
          timestamp: string
          update_description: string | null
          updated_by: string | null
        }
        Insert: {
          equipment_id?: number | null
          id?: number
          timestamp: string
          update_description?: string | null
          updated_by?: string | null
        }
        Update: {
          equipment_id?: number | null
          id?: number
          timestamp?: string
          update_description?: string | null
          updated_by?: string | null
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
            foreignKeyName: "fk_equipment_updates_equipment"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_usage: {
        Row: {
          equipment_id: number
          id: number
          order_id: number | null
          revenue_generated: number
          usage_date: string | null
          usage_hours: number
        }
        Insert: {
          equipment_id: number
          id?: number
          order_id?: number | null
          revenue_generated?: number
          usage_date?: string | null
          usage_hours: number
        }
        Update: {
          equipment_id?: number
          id?: number
          order_id?: number | null
          revenue_generated?: number
          usage_date?: string | null
          usage_hours?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_equipment_usage_equipment"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_equipment_usage_order"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
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
          user_id: string | null
        }
        Insert: {
          availability?: boolean | null
          completed_orders?: number | null
          id?: number
          location?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          availability?: boolean | null
          completed_orders?: number | null
          id?: number
          location?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      makers_materials: {
        Row: {
          experience_level: Database["public"]["Enums"]["experience_level_enum"]
          id: number
          maker_id: number
          material_id: number
        }
        Insert: {
          experience_level: Database["public"]["Enums"]["experience_level_enum"]
          id?: number
          maker_id: number
          material_id: number
        }
        Update: {
          experience_level?: Database["public"]["Enums"]["experience_level_enum"]
          id?: number
          maker_id?: number
          material_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_mm_maker"
            columns: ["maker_id"]
            isOneToOne: false
            referencedRelation: "makers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_mm_material"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
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
          compatibility_notes: string | null
          equipment_id: number
          experience_level: Database["public"]["Enums"]["experience_level_enum"]
          id: number
          maker_id: number
          material_id: number
        }
        Insert: {
          compatibility_notes?: string | null
          equipment_id: number
          experience_level: Database["public"]["Enums"]["experience_level_enum"]
          id?: number
          maker_id: number
          material_id: number
        }
        Update: {
          compatibility_notes?: string | null
          equipment_id?: number
          experience_level?: Database["public"]["Enums"]["experience_level_enum"]
          id?: number
          maker_id?: number
          material_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_me_equipment"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_me_maker"
            columns: ["maker_id"]
            isOneToOne: false
            referencedRelation: "makers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_me_material"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
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
          image_url: string | null
          manufacturer: string | null
          material_url: string | null
          price: number
          quantity: number
          reorder_point: number
          type: Database["public"]["Enums"]["material_type_enum"] | null
          unit_id: number
          vendor_id: number | null
        }
        Insert: {
          color?: string | null
          id?: number
          image_url?: string | null
          manufacturer?: string | null
          material_url?: string | null
          price?: number
          quantity?: number
          reorder_point?: number
          type?: Database["public"]["Enums"]["material_type_enum"] | null
          unit_id: number
          vendor_id?: number | null
        }
        Update: {
          color?: string | null
          id?: number
          image_url?: string | null
          manufacturer?: string | null
          material_url?: string | null
          price?: number
          quantity?: number
          reorder_point?: number
          type?: Database["public"]["Enums"]["material_type_enum"] | null
          unit_id?: number
          vendor_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_materials_unit"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_materials_vendor"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          read_status: boolean | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          read_status?: boolean | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          read_status?: boolean | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
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
          customer_id?: string | null
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
          customer_id?: string | null
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          review_type: string | null
          reviewer_id: string | null
          score: number | null
          target_design_id: number | null
          target_designer_id: string | null
          target_maker_id: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          review_type?: string | null
          reviewer_id?: string | null
          score?: number | null
          target_design_id?: number | null
          target_designer_id?: string | null
          target_maker_id?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          review_type?: string | null
          reviewer_id?: string | null
          score?: number | null
          target_design_id?: number | null
          target_designer_id?: string | null
          target_maker_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_target_design_id_fkey"
            columns: ["target_design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_target_maker_id_fkey"
            columns: ["target_maker_id"]
            isOneToOne: false
            referencedRelation: "makers"
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
          competition_id: number | null
          created_at: string | null
          description: string | null
          design_id: number | null
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
          competition_id?: number | null
          created_at?: string | null
          description?: string | null
          design_id?: number | null
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
          competition_id?: number | null
          created_at?: string | null
          description?: string | null
          design_id?: number | null
          id?: number
          materialCost?: number | null
          paymentStatus?: string | null
          status?: string | null
          timeCost?: number | null
          transactionId?: string | null
          updated_at?: string | null
          userInfo?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_submissions_competition"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_submissions_design"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "designs"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          conversion_factor: number
          id: number
          measurement_type: Database["public"]["Enums"]["measurement_type_enum"]
          unit_name: string
          unit_symbol: string
        }
        Insert: {
          conversion_factor?: number
          id?: number
          measurement_type?: Database["public"]["Enums"]["measurement_type_enum"]
          unit_name: string
          unit_symbol: string
        }
        Update: {
          conversion_factor?: number
          id?: number
          measurement_type?: Database["public"]["Enums"]["measurement_type_enum"]
          unit_name?: string
          unit_symbol?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_by: string | null
          created_at: string | null
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string | null
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          assigned_by?: string | null
          created_at?: string | null
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
          vendor_name: string
          vendor_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          vendor_name: string
          vendor_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          vendor_name?: string
          vendor_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          user_id: string
          role_name: string
        }
        Returns: boolean
      }
      show_all_tables_with_columns: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema_name: string
          table_name: string
          column_name: string
          data_type: string
        }[]
      }
    }
    Enums: {
      competition_reward_enum: "DESIGN_OWNERSHIP" | "CONTRACT"
      design_status_enum: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "UNDER_REVIEW"
      equipment_status_enum: "OPERATIONAL" | "MAINTENANCE" | "RETIRED" | "OTHER"
      equipment_sub_type_enum:
        | "FDM"
        | "SLA"
        | "DLP"
        | "SLS"
        | "SLM_DMLS"
        | "BinderJet"
        | "MaterialJetting"
        | "Router"
        | "MillingMachine"
        | "Lathe"
        | "PlasmaCutter"
        | "LaserCutter"
        | "Waterjet"
        | "EDM"
      equipment_type_enum: "3DPrinters" | "CNCMachines"
      experience_level_enum: "BEGINNER" | "INTERMEDIATE" | "EXPERT"
      material_type_enum:
        | "PLA"
        | "ABS"
        | "PETG"
        | "Resin"
        | "STEEL"
        | "ALUMINUM"
        | "COPPER"
        | "OTHER"
        | "WoodFilament"
        | "MetalFilament"
        | "CarbonFiberFilament"
        | "CompositeFilament"
        | "CeramicFilament"
      measurement_type_enum: "MASS" | "VOLUME" | "LENGTH" | "OTHER"
      review_type_enum: "DESIGN" | "MAKER" | "DESIGNER"
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
