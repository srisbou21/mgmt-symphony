export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  content: string;
  attachments?: string[] | null;
  read: boolean | null;
  created_at: string;
}