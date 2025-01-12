export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subject: string;
  content: string;
  createdAt: string;
  read: boolean;
}