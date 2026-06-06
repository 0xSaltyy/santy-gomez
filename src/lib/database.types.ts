export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ArticleStatus = "draft" | "published";
export type PublicationStatus = "draft" | "published";

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          date: string;
          preview: string;
          content: string;
          sources: string | null;
          image_url: string | null;
          status: ArticleStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          date?: string;
          preview: string;
          content: string;
          sources?: string | null;
          image_url?: string | null;
          status?: ArticleStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: string;
          date?: string;
          preview?: string;
          content?: string;
          sources?: string | null;
          image_url?: string | null;
          status?: ArticleStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      updates: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          date: string;
          summary: string;
          content: string;
          status: PublicationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          date?: string;
          summary: string;
          content: string;
          status?: PublicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: string;
          date?: string;
          summary?: string;
          content?: string;
          status?: PublicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          date: string;
          description: string;
          project_status: string;
          link_url: string | null;
          image_url: string | null;
          publication_status: PublicationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          date?: string;
          description: string;
          project_status: string;
          link_url?: string | null;
          image_url?: string | null;
          publication_status?: PublicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category?: string;
          date?: string;
          description?: string;
          project_status?: string;
          link_url?: string | null;
          image_url?: string | null;
          publication_status?: PublicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      academic_interests: {
        Row: {
          id: string;
          title: string;
          description: string;
          display_order: number;
          status: PublicationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          display_order?: number;
          status?: PublicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          display_order?: number;
          status?: PublicationStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_profile: {
        Row: {
          id: string;
          about_intro: string;
          about_body: string;
          interests_intro: string;
          future_goals: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          about_intro: string;
          about_body: string;
          interests_intro: string;
          future_goals: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          about_intro?: string;
          about_body?: string;
          interests_intro?: string;
          future_goals?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: {
          check_user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type UpdateEntry = Database["public"]["Tables"]["updates"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type AcademicInterest = Database["public"]["Tables"]["academic_interests"]["Row"];
export type SiteProfile = Database["public"]["Tables"]["site_profile"]["Row"];
