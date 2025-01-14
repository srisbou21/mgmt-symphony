export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subject: string;
  content: string;
  attachments?: File[];
  read: boolean;
  createdAt: string;
}