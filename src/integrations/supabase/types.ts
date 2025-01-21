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
      calendar_events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string
          id: string
          location_id: string | null
          start_date: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date: string
          id?: string
          location_id?: string | null
          start_date: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string
          id?: string
          location_id?: string | null
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      discharge_items: {
        Row: {
          created_at: string
          discharge_id: string | null
          equipment_id: string | null
          id: string
          inventory_number: string | null
          quantity: number
          serial_number: string | null
        }
        Insert: {
          created_at?: string
          discharge_id?: string | null
          equipment_id?: string | null
          id?: string
          inventory_number?: string | null
          quantity?: number
          serial_number?: string | null
        }
        Update: {
          created_at?: string
          discharge_id?: string | null
          equipment_id?: string | null
          id?: string
          inventory_number?: string | null
          quantity?: number
          serial_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discharge_items_discharge_id_fkey"
            columns: ["discharge_id"]
            isOneToOne: false
            referencedRelation: "discharges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discharge_items_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      discharges: {
        Row: {
          created_at: string
          created_by: string | null
          discharge_date: string
          discharge_number: string
          employee_id: string | null
          id: string
          notes: string | null
          return_date: string | null
          status: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          discharge_date: string
          discharge_number: string
          employee_id?: string | null
          id?: string
          notes?: string | null
          return_date?: string | null
          status?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          discharge_date?: string
          discharge_number?: string
          employee_id?: string | null
          id?: string
          notes?: string | null
          return_date?: string | null
          status?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discharges_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          created_at: string
          created_by: string
          description: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          signature_required: boolean | null
          signed: boolean | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          version: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          signature_required?: boolean | null
          signed?: boolean | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          signature_required?: boolean | null
          signed?: boolean | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          position: string | null
          service_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          position?: string | null
          service_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          position?: string | null
          service_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          available_quantity: number
          category: string
          created_at: string
          created_by: string | null
          id: string
          inventory_number: string | null
          last_maintenance: string | null
          location: string
          min_quantity: number
          name: string
          observation: string | null
          serial_number: string | null
          service: string
          status: string
          supplier: string | null
          type: string
          updated_at: string
        }
        Insert: {
          available_quantity?: number
          category: string
          created_at?: string
          created_by?: string | null
          id?: string
          inventory_number?: string | null
          last_maintenance?: string | null
          location: string
          min_quantity?: number
          name: string
          observation?: string | null
          serial_number?: string | null
          service: string
          status: string
          supplier?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          available_quantity?: number
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          inventory_number?: string | null
          last_maintenance?: string | null
          location?: string
          min_quantity?: number
          name?: string
          observation?: string | null
          serial_number?: string | null
          service?: string
          status?: string
          supplier?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment_types: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          building: string | null
          created_at: string
          created_by: string | null
          description: string | null
          floor: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          building?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          floor?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          building?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          floor?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string | null
          equipment_id: string | null
          id: string
          notes: string | null
          reason: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          equipment_id?: string | null
          id?: string
          notes?: string | null
          reason: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          equipment_id?: string | null
          id?: string
          notes?: string | null
          reason?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          created_at: string
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
          subject: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
          subject: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          subject?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          permissions?: Json | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      signatures: {
        Row: {
          created_at: string
          document_id: string | null
          id: string
          signature_data: string
          signed_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          id?: string
          signature_data: string
          signed_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          id?: string
          signature_data?: string
          signed_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "signatures_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          commercial_register: string | null
          contact: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          commercial_register?: string | null
          contact?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          commercial_register?: string | null
          contact?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
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
