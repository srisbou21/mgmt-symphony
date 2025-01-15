export interface Document {
  id: number;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  version: number;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  metadata: {
    author?: string;
    department?: string;
    expirationDate?: string;
    [key: string]: any;
  };
}