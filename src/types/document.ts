export interface Document {
  id: string;
  title: string;
  description?: string;
  file_url: string | null;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  version: number | null;
  tags: string[] | null;
  category: string | null;
  status: string | null;
}